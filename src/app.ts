
import express, { Request, Response } from 'express';

const app= express()
const port= 3000
const mongoose=require('mongoose')
const multer=require('multer')
app.use(express.json())
mongoose.connect("mongodb+srv://Nikitha:nikky@cluster0.8lbm2.mongodb.net/")
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))
app.use(multer().any())

app.get("/", (req: Request, res: Response) =>{
  return res.send("Hello Typescript");
});

app.listen(port, ()=>{
    console.log("app is running on port 3000")
})