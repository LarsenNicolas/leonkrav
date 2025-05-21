import { MercadoPagoConfig } from 'mercadopago';
import { Preference } from 'mercadopago/dist/clients/preference';
import { NextRequest, NextResponse } from 'next/server';

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const preferenceClient = new Preference(mercadopago);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("esto es BODY");
        console.log(body);

        const preference = await preferenceClient.create({
            body: {
                items: body.cart.map((item: any) => ({
                    title: item.product.title,
                    unit_price: item.product.price,
                    quantity: item.quantity,
                })),
                payer: {
                    email: "test_user_123456@testuser.com" // Email de prueba REQUERIDO
                },
                back_urls: {
                    success: 'https://9ff2-2800-810-497-953e-2567-907a-6721-887a.ngrok-free.app/success',
                    failure: 'https://9ff2-2800-810-497-953e-2567-907a-6721-887a.ngrok-free.app/failure',
                    pending: 'https://9ff2-2800-810-497-953e-2567-907a-6721-887a.ngrok-free.app/pending',
                },
                auto_return: 'approved',
            }
        });

        return NextResponse.json({ id: preference.id, init_point: preference.init_point });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Error al crear la preferencia' }, { status: 500 });
    }
}
