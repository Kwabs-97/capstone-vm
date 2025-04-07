import { Client } from "pg";
import fs from "fs";

// Function to read the content of secret files
function readSecretFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, 'utf8').trim();
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Read secrets from files based on environment variables
const dbUser = 
process.env.DATABASE_USERNAME_FILE ? 
  readSecretFile(process.env.DATABASE_USERNAME_FILE) : 
  process.env.DATABASE_USERNAME;

const dbPassword = 
process.env.DATABASE_PASSWORD_FILE ? 
  readSecretFile(process.env.DATABASE_PASSWORD_FILE) : 
  process.env.DATABASE_PASSWORD?.toString();

const dbName = process.env.DATABASE_NAME_FILE 
? 
  readSecretFile(process.env.DATABASE_NAME_FILE) : 
  process.env.DATABASE_NAME;

const dbHost = process.env.DATABASE_HOST_FILE 
? 
  readSecretFile(process.env.DATABASE_HOST_FILE) : 
  process.env.DATABASE_HOST;

// Create client with the file contents
try {
  
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: 5432, // Connect to the exposed port
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
      rejectUnauthorized: false
    }
  });
} catch (error) {
  console.log("Error creating client:", error); 
}





