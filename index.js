import 'dotenv/config'
import express from "express";

import userRouter from './routes/user.route.js'
import publicRouter from './routes/public.route.js'
import petRouter from './routes/pets.route.js'

const app = express()


app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use('/',publicRouter)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/pets', petRouter)

app.use(express.static('public'))

const PORT = process.env.PORT || 3000;



app.listen(PORT,()=> console.log('servidor arriba '+PORT))