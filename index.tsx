import { FileSystemRouter } from 'bun';
import { renderToReadableStream } from 'react-dom/server';

const handleReactComponent = async (req: Request) => {
  const router = new FileSystemRouter({
    dir: process.cwd() + '/pages',
    style: 'nextjs',
  });

  const route = router.match(req);

  if (!route) {
    return new Response('Not found', { status: 404 });
  }

  const component = await import(route.filePath);
  const { props } = component.getServerSideProps
    ? await component.getServerSideProps?.()
    : { props: {} };
  const { default: Component } = component;
  const stream = await renderToReadableStream(<Component {...props} />);

  return new Response(stream, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
};

const handleAPI = async (req: Request) => {
  const router = new FileSystemRouter({
    dir: process.cwd() + '/api',
    style: 'nextjs',
  });

  const route = router.match(req);

  if (!route) {
    return new Response('Not found', { status: 404 });
  }

  const { default: handler } = await import(route.filePath);

  return handler(req, route.params);
};

Bun.serve({
  port: 8080,
  async fetch(req: Request) {
    if (req.url.includes('/api')) {
      return handleAPI(req);
    } else {
      return handleReactComponent(req);
    }
  },
});
