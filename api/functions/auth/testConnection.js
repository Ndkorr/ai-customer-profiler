const { app } = require('@azure/functions');
const { getConnection, sql } = require('../../config/db');

app.http('testConnection', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'test-connection',
    handler: async (request, context) => {
        try {
            // Log each step for better debugging
            context.log('Test connection function triggered');
            
            // Test with a simpler query first
            context.log('Attempting database connection');
            const pool = await getConnection();
            context.log('Database connection successful');
            
            const result = await pool.request().query('SELECT 1 as test');
            context.log('Query executed successfully');
            
            return { 
                status: 200,
                jsonBody: {
                    success: true,
                    message: "Database connection successful",
                    result: result.recordset[0]
                }
            };
        } catch (error) {
            context.error(`Database connection error: ${error.message}`);
            
            return {
                status: 500,
                jsonBody: {
                    success: false,
                    error: error.message
                }
            };
        }
    }
});