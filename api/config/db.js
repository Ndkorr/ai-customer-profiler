const sql = require('mssql');

// Connection configuration
const config = {
  server: process.env.SQL_SERVER || 'insightlens.database.windows.net',
  database: process.env.SQL_DATABASE || 'CustomerDB',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// Connection pool
let pool;

const getConnection = async () => {
  if (!pool) {
    try {
      pool = await new sql.ConnectionPool(config).connect();
      console.log('Connected to CustomerDB database');
    } catch (err) {
      console.error('Database connection error:', err);
      throw err;
    }
  }
  return pool;
};

module.exports = {
  getConnection,
  sql
};