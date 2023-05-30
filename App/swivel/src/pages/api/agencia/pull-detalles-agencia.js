import { SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
agency details retrieval function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
    if(req.method === 'GET'){
        dbConnect();

        const { agency } = req.query;

        try {
            const result = await SellerUser.findOne({ agencia: agency }, "horas_min horas_max dias_anticipo dias_max documentos_requeridos_compra");
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
  