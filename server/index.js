const hasFileExtension = (pathname) => /\.[^/]+$/.test(pathname);

const requestForPath = (request, pathname) => {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const candidates = [
      pathname === '/' ? '/dist/index.html' : `/dist${pathname}`,
      pathname,
    ];

    if (!hasFileExtension(pathname)) candidates.push('/dist/index.html', '/index.html');

    for (const candidate of [...new Set(candidates)]) {
      const response = await env.ASSETS.fetch(requestForPath(request, candidate));
      if (response.status !== 404) return response;
    }

    return new Response('Not found', { status: 404 });
  },
};
