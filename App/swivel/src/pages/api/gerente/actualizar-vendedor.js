import { SellerUser } from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

/* 
seller details update function
Recieves: request object, response object
Returns: response status and json 
*/
export default async function handler(req, res) {
  if (req.method === "PUT") {
    dbConnect();

    const { name, last_name, newEmail, cellphone, _id } = req.body;

    const result = await SellerUser.findOneAndUpdate({ _id: _id}, { nombres: name, apellidos: last_name, email: newEmail, numero_telefonico: cellphone });
    console.log(result);
    res.status(200).json({ message: "User details updated successfully" });    
  }
  else{
    res.status(405).json({ message: "Wrong request method" });
  }
}