import mongoose from 'mongoose';
const Usuario = require('../../../models/usuario');
import dbConnect from "../../../config/dbConnect";
//will change this when sessions are implemented
//import {getSession} from 'next-auth/client'

export default async (req, res) => {

    const {id} = req.query;
    dbConnect();
    try{
        const userData = await Usuario.findById(id);
        res.status(200).json({userData})
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }
    }