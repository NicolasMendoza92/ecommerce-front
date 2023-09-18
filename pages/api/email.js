import { transporter, mailOptions } from "@/lib/mailService";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();

    const { name, email, city, postalCode, streetAddress, country, total, cartProducts } = req.body;

    const productsIds = cartProducts;
    // buscamos dentro de ese array
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });
    try {
        await transporter.sendMail({
            ...mailOptions,
            to: email,
            subject: `Order data confirmation `,
            html: `
            <div class="d-flex justify-content-start">
           <h4> Hi ${name}! Thank you for your Order! </h4>
          <ul >
           <li> Total amount:<b> ${total} USD </b> </li>
           <li> Delivery address: ${streetAddress}</li>
           <li> City, Postal Code, Country:${city}, ${postalCode} - ${country} </li>
          </ul>
          <hr style="width:30%;text-align:left;margin-left:0" > 
          <b> Order details: </b>
     <table class="table">
     <thead>
      <tr class="text-center" >
         <th>Image</th>
         <th>Product</th>
         <th>Price</th>
      </tr>
     </thead>
     <tbody>
        ${productsInfos.map(p => `
        <tr class="text-center " >
         <td><img style="width:80px;" src=" ${p.images?.[0]}"/></td>
         <td> ${p.title} </td>
         <td> ${p.price} € </td>
        </tr>
        `)} 
     </tbody>
     </table>
     <hr style="width:30%;text-align:left;margin-left:0" >
          <p> Thank you for trust in us </p>
          </div>
         `
        })

        return res.status(200).json({ success: true });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}