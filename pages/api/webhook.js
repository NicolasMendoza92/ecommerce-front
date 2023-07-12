import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
// con este importe, podemos hacer un request a la plataforma de stripe
import { buffer } from "micro";

// previamnte, debemos instalar el CLI de stripe en nuestro window y correrlo con el cdm comand line. Seguir los pasos de la pagina.
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.END_POINT_SECRET_STRIPE

export default async function handler(req,res) {
  await mongooseConnect();
//   traemos este codigo de webhooks de stripe, es para poder traer info de stripe a nuestro endpoint, que en este caso es localhost. hacemos feedback (esta en desorrallodores de stripe)
  const sig = req.headers['stripe-signature'];

  let event;

//   dentro del try, llamamos al buffer de micro (npm - HTTP microservices)
  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event.
  // Nos fijamos con console log de "data" que obtenemos de event.data.objet, si es que el caso es "checkout.session.completed"
  // hay elementos de stripe  que no estamos manejando payment_intent.succeeded , payment_intent.created o charge.succeeded. Esto es mas informacion que podemos traer. 
  switch (event.type) {
    case 'checkout.session.completed':
      console.log(data)
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

// tenemos que poner todo con parse, para que next js lo reconozca

export const config = {
  api:{bodyParser:false,}  
};