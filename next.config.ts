const nextConfig = {
    images: {
        domains: ['icdn.tradew.com', 'leonkrav.com.ar'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
              default-src 'self';
              connect-src 'self' https://api.mercadopago.com;
              form-action 'self' https://www.mercadopago.com;
              frame-src https://www.mercadopago.com;
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
            `.replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
