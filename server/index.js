const hasFileExtension = (pathname) => /\.[^/]+$/.test(pathname);

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || hasFileExtension(new URL(request.url).pathname)) return response;

    const indexRequest = new Request(new URL('/index.html', request.url), request);
    return env.ASSETS.fetch(indexRequest);
  },
};
