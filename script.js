// Script pertama

export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      url.hostname = 'Masukan Host kamu bila tidak work harus pointing proxied';
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    return env.ASSETS.fetch(request);
  },
};

// script ke dua

export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    // Jika memang mau semua path diproxy, kondisi ini akan selalu true.
    // Lebih baik ganti '/proxy' atau nama lain kalau ingin selektif.
    if (url.pathname.startsWith('/')) {
      url.hostname = 'example.com'; // GANTI dengan hostname target mu
      const newRequest = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.clone().arrayBuffer(),
        redirect: 'manual',
      });
      return fetch(newRequest);
    }
    return env.ASSETS.fetch(request);
  },
};

// script ke tiga

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Semua path akan diarahkan ke host tujuan
    if (url.pathname.startsWith('/')) {
      // Ganti ini dengan domain target kamu
      url.hostname = 'domain-target-kamu.com';

      // Buat request baru ke host tujuan
      const newRequest = new Request(url.toString(), request);
      return fetch(newRequest);
    }

    // Jika tidak ada path (misal request asset), fallback ke env.ASSETS
    return env.ASSETS.fetch(request);
  },
};

// ke empat

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.hostname = 'c7.620720.xyz'
    return fetch(new Request(url, request))
  }
}
