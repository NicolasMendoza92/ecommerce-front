import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
const bcryptjs = require('bcryptjs');

export default async function handler(req,res){
await mongooseConnect();
    // desectructuracion de prop del objeto
    const { email, password} = req.body;

 if(req.method === 'POST'){
    try {
        // Revisando q el email sea unico
        let userfind = await User.findOne({ email });
        if (userfind) {
            return res.status(400).send('User already exists');
        }

        // nuevos usuarios, hacemos que todos los logeados sean user comunes
        const bodyUser = { ...req.body, role: 'user', register: new Date() };

        // nuevo usuario
        let user = new User(bodyUser);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await user.save();

        //mensaje de exito
        res.send("User create correctly");
        
    } catch (error) {
        console.log(error);
        res.status(400).send("We have an error");
    }
 }   
    

}