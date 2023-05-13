const Usuario = require('../../../models/usuario');
import dbConnect from "../../../config/dbConnect";
//will change this when sessions are implemented
//import {getSession} from 'next-auth/client'

export default async (req, res) => {
    if(req.method !== 'GET'){
        return res.status(405).json({message: 'Metodo no permitido'})
    }
    
    const {id} = req.query;
    dbConnect();
    try{
        const userData = await Usuario.findById(id);
        if(!userData){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.status(200).json({message: 'Usuario encontrado',userData})
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }
    }