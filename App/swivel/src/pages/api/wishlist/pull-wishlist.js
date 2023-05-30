import { BuyerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
buyer wishlist retrieval function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    if(req.method === 'GET'){
        dbConnect();

        const { id } = req.query;

        const e_role = encryptRole("user")

        try {
            const result = await BuyerUser.findOne({ tipo_usuario: e_role, _id: id }, "lista_deseos");
            res.status(200).json(result);
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
  