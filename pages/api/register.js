import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
const bcryptjs = require('bcryptjs');

export default async function handler(req,res){
await mongooseConnect();

if(req.method === 'POST'){
    
    try {
        const {email,password} = req.body;
        // Revisando q el email sea unico
        let userfind = await User.findOne({ email });
        if (userfind) {
            return res.status(400).send('Ya existe cuenta con este Email');
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
        res.send("Usuario Creado Correctamente");
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error");
    }
}

}