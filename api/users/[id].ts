export default async function (req: Request, params: { id: string }) {
  const { id } = params;

  return new Response(`Hello from /users/${id}.ts`);
}
