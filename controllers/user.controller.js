import bcryptjs from 'bcryptjs'
import { userModel } from "../models/user.model.js"


const register =async(req, res)=>{

    try {
       
        const {username, email, password}= req.body

        if(!username || !email || !password){
            return res.status(400).json({ok: false,msg:"Missing require fields"})
        }

        const user= await userModel.findOneByEmail(email)
        if(user){
            return res.status(401).json({ok: false, msg: "Email ya existe"})
        }

        
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser= await userModel.create({email, password: hashedPassword, username})

        

        return res.status(201).json({ok:true, msg: newUser})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Error de server'
        })
    }
}

const login =async(req, res)=>{

    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Error de server'
        })
    }
}

export const UserController={
    register,
    login

}