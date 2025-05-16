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
                back_urls: {
                    success: 'https://localhost:3000/success',
                    failure: 'https://localhost:3000/failure',
                    pending: 'https://localhost:3000/pending',
                },
                auto_return: 'approved',
            }
        });

        return NextResponse.json({ id: preference.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Error al crear la preferencia' }, { status: 500 });
    }
}
