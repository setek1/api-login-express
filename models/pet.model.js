import { query } from 'express'
import {db} from '../database/connection.database.js'


const count=async()=>{
    const query ={
        text: 'select count(*) from pets'
    }
    const {rows}= await db.query(query)
    return parseInt(rows[0].count)
}

const findAll=async({limit=5, page=1})=>{
    const offset=(page -1) * limit
    const query = {
        text:`
        SELECT * FROM PETS
        Limit $1
        OFFSET $2
        `,
        values:[limit, offset]
    }
    const {rows} = await db.query(query)
    return rows

}

export const PetModel={
    findAll,
    count
}