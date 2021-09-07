// Tashqi Model
import express, { NextFunction, Request,Response,Router} from 'express';
import _, { find } from 'lodash';
import cors from 'cors';
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');

// Ichki Model
import {Users,Messages}  from '../db/db';
import * as Schemadb from '../Schema/schema';

const router:Router=Router();

var corsOptions = {
    origin: '*',
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 200
}
// GET
router.get('/',cors(corsOptions),(req:Request,res:Response)=>{
    res.status(200).render('index');
});
router.get('/login',cors(corsOptions),async(req:Request,res:Response)=>{
   
    res.status(200).render('login');
    
});
router.get('/users',cors(corsOptions),(req:Request,res:Response)=>{
    res.status(200).render('users');
});
router.get('/messages',cors(corsOptions),async (req:Request,res:Response)=>{
   
    let user=await Users.findOne({username:req.query.username}).select({password:1});
    try{
        if(req.query.message){
            req.query.author=user._id
            const message=new Messages(_.pick(req.query,['message','author']))
            await message.save()
            const messages=await Messages.find().populate('author')
            res.status(200).render('messages',{messages,name:req.query.username,pass:req.query.password})
        }else{
            const bcr=await bcrypt.compare(req.query.password,user.password)
           
            if(bcr){
                const token=jwt.sign({_id:user._id},process.env.jwtKey);
                const messages=await Messages.find().populate('author')
                res.status(200).header({'X-Auth-Token':token}).render('messages',{messages,name:req.query.username,pass:req.query.password})
            }else{
                res.status(400).json({Type:false,Error:`Username yoke password hato`})
            }
        } 
    }catch(err){
            res.status(400).json({Type:false,Error:`Username yoke password hato \n ${err}`})
    }        
    
    
});


// POST
router.post('/users',cors(corsOptions),async (req:Request,res:Response)=>{
    const result=await Schemadb.UserSchema.validate(_.pick(req.body,['username','email','password']));
    if(result.error){
        console.log(result.error)
        res.json(result.error.details[0].message)
    }else{
        try{
            const Salt=await bcrypt.genSalt()
            req.body.password=await bcrypt.hash(req.body.password,Salt)
            const user=new Users(_.pick(req.body,['username','email','password']));
            await user.save();
            res.redirect('/login')
        }catch(err){
            res.status(400).json({Type:false,Error:'Bu Foydalanuvchi ro\'yhatdan o\'tgan'})
        }
        
    }
    
});
//router.post('/messages',cors(corsOptions),async (req:Request,res:Response)=>{

//    res.render('messages')

//});

export default router;