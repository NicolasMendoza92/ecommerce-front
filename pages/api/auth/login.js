import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


export default async function handler(req,res){
    mongooseConnect();
    if(req.method === 'POST'){
        try {
            // desesctructuramos las prop, esto es lo que se le pedira al usuario cuando se logee 
            const { email, password } = req.body;
    
            // vemos las validaciones, busca si ya existe algno registrado con el metodo findOne en el user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json('usuario no existe');
            }
            // codigo para revisar password y encriptarla 
            const passCorrect = await bcryptjs.compare(password, user.password);
            if (!passCorrect) {
                return res.status(400).json('Password incorrecto');
            }
    
            // Si todo es correcto en las validaciones Crear y firmar JWT (el token - alfanumerico de datos) - codigo para realizarlo
            const payload = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };
    
            jwt.sign(
                payload,
                // usamos la vble de entorno como el url de mongo 
                process.env.SECRET,
                {
                    expiresIn: 360000, //1 hora
                },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token, name: user.name });
                }
            );
    
        } catch (error) {
            res.status(400).send('error de conexion');
        }
    }

//     if(req.method === 'GET'){

//     // Leer token - esto lo hacemos en header ( es una parte de la request como el body donde podemos enviar datos )
//     const token = req.headers('x-auth-token');

//     // Revisar Token
//     if (!token) {
//         // esto es para cuando el usuario no esta logeado
//         return res.status(401).json('No hay Token, permiso no valido');
//     }
//     // Validar Token
//     try {
//         const cifrado = jwt.verify(token, process.env.SECRET);
//         // aca hacemos como un cifrado y le indicamos que es lo que queremos que muestre cuando llamo a la response.data de la API.
//         const user = await User.findById(cifrado.user.id).select('name role email');
//         res.send(user);
//     } catch (error) {
//         res.status(401).json('Token no valido');
//     }
//     }
}