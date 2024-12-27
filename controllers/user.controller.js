import bcryptjs from 'bcryptjs'
import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"


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

        const token = jwt.sign({
            email: newUser.email,
            role_id: newUser.role_id
        },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )

        return res.status(201).json({ok:true, msg: newUser, token: token})
        
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
        const {email, password}= req.body
        
        if(!email || !password){
            return res.status(400).json({error:"Se requiere de email y contrase;a"})
        }

        const user = await userModel.findOneByEmail(email)
        if (!user){
            return res.status(400).json({error:"El usuario no existe"})
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({error:"Credenciales invalidas"})
        }

        const token = jwt.sign({
            email: user.email,
            role_id: user.role_id
        },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )

        return res.status(200).json({ok: true, token:token})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Error de server'
        })
    }
}

const profile= async (req, res)=>{
    try {
        const user = await userModel.findOneByEmail(req.email)
        return res.json({ok: true, msg: user})
        
    } catch (error) {
        console.log(error)
    }
}

const findAll=async(req, res)=>{
    try {
        const users = await userModel.findAll()
        
        return res.json({ok : true, msg : users})
    } catch (error) {
        console.log(error)
    }

}

const updateRoleVet =async (req, res)=>{

    try {
        const {uid}= req.params
        const user= await userModel.findOneByUid(uid)

        if (!user){
            return res.status(400).json({error:"El usuario no existe"})
        }

        const updateUser = await userModel.updateRoleVet(uid)

        return res.json({
            ok:true,
            msg:updateUser
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'Error server'})
    }

}

export const UserController={
    register,
    login,
    profile,
    findAll,
    updateRoleVet

}