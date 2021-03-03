import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
const app = express()



app.use(bodyParser.json({limit: "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
const corsOptions = {
    origin: ['https://pedantic-kilby-831de2.netlify.app','http://localhost:3000'],
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))

dotenv.config() 
app.use('/posts', postRoutes)
app.use('/login', (req,res) => {
    res.send({
        token:'test123'
    })
} )
app.get('/',(req,res)=>{
    res.send('hello')
})
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message) )


    mongoose.set('useFindAndModify',false)