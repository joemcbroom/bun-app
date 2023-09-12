import { FileSystemRouter } from 'bun';
import { renderToReadableStream } from 'react-dom/server';

const loadStyles = async () => {
  const file = Bun.file('./output.css');
  const text = await file.text();
  return text;
};

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

  const App = (await import('./App.tsx')).default;

  const styles = await loadStyles();
  const stream = await renderToReadableStream(
    <App styles={styles}>
      <Component {...props} />
    </App>
  );

  return new Response(stream, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
};

const handleAPI = async (req: Request) => {
  const router = new FileSystemRouter({
    dir: process.cwd(),
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
  port: 3000,
  async fetch(req: Request) {
    if (req.url.includes('/api')) {
      return handleAPI(req);
    } else {
      return handleReactComponent(req);
    }
  },
});
