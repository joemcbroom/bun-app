export default function App({ children, styles }) {
  return (
    <>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <style
          dangerouslySetInnerHTML={{
            __html: styles,
          }}
        />
      </head>
      <main className='text-white bg-slate-800 h-full w-full'>{children}</main>
    </>
  );
}
