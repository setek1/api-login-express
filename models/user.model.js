import {db} from '../database/connection.database.js'

const create = async({email, password, username})=>{
    const query ={
        text:`
        INSERT INTO USERS (email, password, username)
        values ($1, $2, $3)
        RETURNING email, username, uid, role_id
        `,
        values: [email,password,username]
    }

    const {rows} =await db.query(query)
    return rows[0]


}

const findOneByEmail= async(email)=>{
    const query={
        text:`
        SELECT * FROM USERS WHERE EMAIL = $1
        `,
        values:[email]
    }

    const {rows}= await db.query(query)
    return rows[0]
}

const findAll = async()=> {
    const query={
        text:`
        SELECT * FROM users 
        `,
        
    }

    const {rows}= await db.query(query)
    
    return rows
}

const  findOneByUid =async(uid)=>{
    try {
        const query={
            text:`
            SELECT * FROM USERS WHERE uid = $1
            `,
            values:[uid]
        }
    
        const {rows}= await db.query(query)
        return rows[0]
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'Error server'})
    }
}  

const updateRoleVet =async(uid)=>{
    try {

        const query={
            text:`
            UPDATE users 
            SET role_id=2
            WHERE uid= $1
            RETURNING *
            `,
            values:[uid]
        }
    
        const {rows}= await db.query(query)
        return rows[0]
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'Error server'})
    }
}

export const userModel = {
    create,
    findOneByEmail,
    findAll,
    findOneByUid,
    updateRoleVet
}