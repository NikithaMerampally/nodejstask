
import express, { Request, Response } from 'express';

const app= express()
const port= 3000

app.get("/", (req: Request, res: Response) =>{
  return res.send("Hello Typescript");
});

app.listen(port, ()=>{
    console.log("app is running on port 3000")
})