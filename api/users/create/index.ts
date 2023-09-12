import { db } from '../../../utils/DB';

export default async function (req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const createTable = db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );`
  );

  createTable.run();

  try {
    const body = await req.json();
    const { name, email } = body;
    const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?);');
    insert.run(name, email);
    console.log(body);
    return new Response(JSON.stringify({ status: 200 }));
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
