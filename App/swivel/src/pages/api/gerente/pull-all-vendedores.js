import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { encryptRole } from "../../../utils/crypto";

/* 
ALL seller details retrieval function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    if(req.method === 'GET'){
        dbConnect();

        try {
            let result = await User.find({ tipo_usuario: encryptRole("seller") }).exec();
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
  