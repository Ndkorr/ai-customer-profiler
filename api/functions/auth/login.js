const { app } = require('@azure/functions');
const { getConnection, sql } = require('../../config/db');
const crypto = require('crypto');

// Helper function to hash passwords (for future use)
const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
};

// Helper function to verify passwords
const verifyPassword = (password, hash, salt) => {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
};

app.http('login', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'login',
    handler: async (request, context) => {
        context.log('Login HTTP trigger function processed a request.');

        // For POST requests, validate credentials
        if (request.method === 'POST') {
            try {
                const body = await request.json();
                context.log('Attempting to authenticate user:', body.username);
                
                // Get database connection
                const pool = await getConnection();
                context.log('Database connection established');
                
                // Query the database for the user - with detailed logging
                context.log('Executing query to find user with email:', body.username);
                
                const result = await pool.request()
                    .input('email', sql.NVarChar, body.username)
                    .query('SELECT AccountID, EmailAddress, Passwords, AccountType FROM dbo.Accounts WHERE EmailAddress = @email');
                
                context.log('Query executed, records found:', result.recordset.length);
                
                const user = result.recordset[0];
                
                if (user) {
                    context.log('User found, comparing passwords');
                    // For now, direct password comparison 
                    // (should migrate to proper hashing in production)
                    if (user.Passwords === body.password) {
                        context.log('Password match, authentication successful');
                        return {
                            status: 200,
                            jsonBody: {
                                message: "Login successful",
                                token: `token-${user.AccountID}-${Date.now()}`,
                                userId: user.AccountID,
                                accountType: user.AccountType
                            }
                        };
                    } else {
                        context.log('Password mismatch');
                    }
                } else {
                    context.log('No user found with email:', body.username);
                }
                
                // If no user found or password doesn't match
                return {
                    status: 401,
                    jsonBody: { error: "Invalid username or password" }
                };
                
            } catch (error) {
                // Enhanced error logging
                context.error('Error processing login request:', error);
                return {
                    status: 500,
                    jsonBody: { 
                        error: "Server error during authentication",
                        details: process.env.NODE_ENV === 'development' ? error.message : undefined
                    }
                };
            }
        }

        // For GET requests, return info about the login endpoint
        return {
            status: 200,
            jsonBody: { 
                message: "Login endpoint is operational. Send POST request with username/password to authenticate." 
            }
        };
    }
});