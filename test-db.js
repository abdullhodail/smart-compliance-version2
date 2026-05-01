const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  try {
    console.log('Attempting to connect to:', process.env.DIRECT_URL.split('@')[1]);
    await client.connect();
    console.log('SUCCESS: Connected to database');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('FAILURE: Could not connect to database');
    console.error(err);
  }
}

testConnection();
