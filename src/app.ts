import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes'; 
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb+srv://Nikitha:nikky@cluster0.8lbm2.mongodb.net/")
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

app.use("/user", router);  

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
