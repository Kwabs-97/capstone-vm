import { createClient } from "@supabase/supabase-js";
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
const dbUser = process.env.DATABASE_USERNAME_FILE ? 
  readSecretFile(process.env.DATABASE_USERNAME_FILE) : 
  process.env.DATABASE_USERNAME;

const dbPassword = process.env.DATABASE_PASSWORD_FILE ? 
  readSecretFile(process.env.DATABASE_PASSWORD_FILE) : 
  process.env.DATABASE_PASSWORD;

const dbName = process.env.DATABASE_NAME_FILE ? 
  readSecretFile(process.env.DATABASE_NAME_FILE) : 
  process.env.DATABASE_NAME;

const dbHost = process.env.DATABASE_HOST_FILE ? 
  readSecretFile(process.env.DATABASE_HOST_FILE) : 
  process.env.DATABASE_HOST;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const client = createClient(supabaseUrl, supabaseKey);

export default client;