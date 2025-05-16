import mercadopago from 'mercadopago';

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items inválidos' });
        }

        const preference = {
            items,
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending',
            },
            auto_return: 'approved',
        };

        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({ init_point: response.body.init_point });
    } catch (error) {
        console.log('Error creando preferencia:', error);
        res.status(500).json({ error: 'Error creando preferencia' });
    }
}
