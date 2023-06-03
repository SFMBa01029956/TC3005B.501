import { User } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
buyer wishlist update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    if(req.method === 'PUT'){
        dbConnect();

        const { id, lst } = req.body;

        const e_role = encryptRole("user")

        try {
            await User.findOneAndUpdate({ tipo_usuario: e_role, _id: id }, { lista_deseos: lst });
            res.status(200).json({ message: "Wishlist updated successfully" });
        } 
        catch (error) {
            console.error('Error fetching data:', error);
            res.status(400).json({ error: 'An error occurred' });
        }
    }
    else {
        res.status(405).json({ message: "Wrong request method" });
    }
  }
  