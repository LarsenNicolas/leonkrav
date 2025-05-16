import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    // Validar que es de tipo payment
    if (body.type === 'payment') {
        const paymentId = body.data.id;

        // Podrías usar el SDK o directamente llamar a la API de Mercado Pago
        console.log('Pago recibido. ID:', paymentId);

        // Aquí podrías guardar en DB, enviar email, etc.
    }

    return new NextResponse('ok', { status: 200 });
}
