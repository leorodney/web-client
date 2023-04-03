import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const loginRoute = async (req: Request, res: Response)=>{
    const {emailorusername, password} = req.body;
    const authenticated = req.session.user?.authenticated;
    console.log(req.session.user);
    try{
        if(authenticated){
            return res.status(200).json({message: 'You are already authenticated', ok: true});
        }

        const user = await User.findOne({$or: [{username: { $eq: emailorusername } }, {email: { $eq: emailorusername } }]});        
        if(!user){ 
            return res.status(404).json({message: 'User not found', ok: false}); 
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(401).json({message: 'Invalid password or Email/Username', ok: false});
        }
        res.status(200).json({message: 'Login successful'});
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
};
