// Tashqi Model
import express from 'express';
import morgan from 'morgan';
import hbs from 'hbs';
const mongoose=require('mongoose');
import dotenv from 'dotenv';
// Ichki Model
import rotuer from './routers/router';
import production from './production/prod';



const app=express();
dotenv.config();
mongoose.connect(process.env.URL)
    .then(()=>console.log("Ulandi db..."))
    .catch((err:Error)=>console.log(`Xato Ro'yberdi db ${err}`));


production(app);


if(app.get('env')==='development'){
    app.use(morgan('tiny'));
}
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/',rotuer);

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server Ishga tushdi ${PORT}...`));
