import jwt from 'jsonwebtoken'

export const verifyToken=(req,res, next)=>{
    let token = req.headers.authorization

    if(!token){
        return res.status(400).json({error: 'Token not provided'})
    }

    //Se ocupa split por que esta ocupando bearer token
    token = token.split(" ")[1]
   

    try {
        const {email}=jwt.verify(token, process.env.JWT_SECRET)
        //el req en este caso actua como una inyeccion de datos al controlador.
        req.email= email
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: 'Invalid token'})
    }

    
}