import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Address } from "@/models/Address";

export default async function handler(req,res){
await mongooseConnect();
const session = await getServerSession(req,res, authOptions);

if(req.method === 'PUT'){
   
    const address = await Address.findOne({user:session?.user.email});
    
    if(address){
        res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else{
       res.json( await Address.create({user:session?.user.email, ...req.body}));
    }
}

if(req.method === 'GET'){

    const address = await Address.findOne({user:session?.user.email});
    res.json(address);
}

}