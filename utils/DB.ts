import { Database } from 'bun:sqlite';

export const db = new Database('db.sqlite', { create: true });

// create users table if doesn't exist
