import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

const validateToken = (req:Request, res:Response, next: NextFunction)=>{
    const headerToken = req.headers['authorization'];
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){

        try {
            //get token without 'bearer'
            const bearerToken = headerToken.slice(7);
            //SecretKey
            const secretKey : any = process.env.KEY;
            
            //console.log(bearerToken);
            
            jwt.verify(bearerToken, secretKey)
    
            next();
            
        } catch (error) {
            res.status(401).json({
                msg : 'Invalid Token'
            })
        }

    }else{
        res.status(401).json({
            msg: 'Access denied'
        })
    }

}

export default validateToken;