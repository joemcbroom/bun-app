import { db } from '../../utils/DB.ts';

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
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?);');
    insert.run(name, email);
    return Response.redirect('/users', 303);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
