import { Request, Response } from "express"
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();

// Verifica que la clave secreta esté definida
if (!process.env.KEY) {
    throw new Error('KEY environment variable is not defined');
}
export const newUser = async (req:Request, res:Response) => {
    
    const { username, email, password, rol } = req.body;

    //Validate if it exists in the database
    const user = await User.findOne({ where: { username: username } });

    if (user){
        return res.status(400).json({
            msg : `User ${username} exist in Database`
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            username : username,
            password : hashedPassword,
            email: email,
            rol: rol
        })
    
        res.json({
            msg: `User ${username} creted susecsfull`
        })
    } catch (error) {
        res.status(400).json({
            msg: "Oops something went wrong: ",
            error
        })
    }
}

export const loginUser = async (req:Request, res:Response) => {
    
    const { username, password } = req.body;

    //Validate if it exists in the database
    const user: any = await User.findOne({ where: { username: username } }); 
    if(!user){
        return res.status(400).json({
            msg: `A user named ${username} was not found in the database`
        })
    }
    //Check if the password is the same
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword){
        return res.status(400).json({
            msg : "Invalid Password "
        })
    }
    //Generar token
    const secretKey : any = process.env.KEY;
    const token = jwt.sign({ username: username }, secretKey, {
        expiresIn : '3600000'
    });

    res.json({token});
}

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        // Validate if it exists in the database
        const findByEmail: any = await User.findOne({ where: { email: email } });

        if (!findByEmail) {
            return res.status(400).json({
                msg: `Email ${email} was not found in the database`
            });
        } else {
            // Return a response with true if the email is found
            return res.status(200).json({
                msg: true
            });
        }
    } catch (error : any) {
        // Handle any errors that occur during the database query
        console.error('Error finding email in the database:', error);
        return res.status(500).json({
            msg: 'An error occurred while searching for the email in the database',
            error: error.message
        });
    }
};