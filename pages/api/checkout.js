import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_SK);


export default async function handler(req, res) {
    // pequeña validacion del metodo 
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
    // en caso de post entonces traemos todo lo de los  inputs de checkout payment
    const { name, email, city, postalCode, streetAddress, country, cartProducts, total } = req.body;
    await mongooseConnect();

    const productsIds = cartProducts;
    // buscamos dentro de ese array, id unicos 
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });
    // asi se llama en stripe, y tiene una manera de poner las cosas, creamos todo lo que necesitamos y lo pusheamos al array
    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(prod => prod._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length;
        // si la cantidad del carrito es mayor a cero y tenemos info de producto entonces
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: { name: productInfo.title },
                    unit_amount: productInfo.price * 100,
                },
            });
        }

    }
    // esto se hace, independientemente de que el pago se haya hecho o no, es una orden.
    // creo una order con los siguientes parametros, que son los de mi Models->Order.js, para luego enviarla a mi base de datos de mongoose. 
    const orderDoc = await Order.create({
        line_items, name,email, city, postalCode, streetAddress, country, paid: false, total,
    });


    // esto es lo que necesita Stripe para la sesion. 
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
    });

    // esta es la direccion que me abre la pantalla de pago de stripe. 
    res.json({ url:session.url, })

}




