const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

app.use(express.json());
app.use(cors());


// Database Connection with Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/menu');

// API creation 
app.get("/", (req, res)=>{
  res.send("Express App is Running")
})
// Schema 


// Create the model
const Product = mongoose.model('menu', {
  id:{
    type: Number,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  available:{
    type:Boolean,
    default: true,
  },
})


// Creating API for getting all Products

app.get("/allproducts", async(req, res)=>{
  let products = await Product.find({})
  // console.log("All Products Fetch")
  res.send(products)
})

// Schema for user login 

const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String, 
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

// Creating endpoint for registering user

app.post('/signup', async(req,res)=>{
   
  let check = await Users.findOne({email:req.body.email});
  if(check) {
    return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
      cart[i]=0; 
  }
  const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }

  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token})

}) 

// Create endpoint for user Login

  app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user) {
      const passCompare = req.body.password === user.password;
      if(passCompare) {
        const data = {
          user:{
            id:user.id
          }
        }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true, token})
      }
      else{
        res.json({success:false,error:'Wrong Password'});
      }
    }else{
      res.json({success:false, error:"Wrong Email Id"})
    }
  })


  // Creatnig middleware to fetch user

  const fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token')
    if(!token) {
      res.status(401).send({error:'Please authenticate using valid token'})

    }
    else{
      try {
        const data = jwt.verify(token,'secret_ecom')
        req.user = data.user;
        next();
      } catch (error) {
        res.status(401).send({error:'Please authenticate A valid token'})
      }
    }
  }

  // Creating endpoint for adding product in cartdata

  app.post('/addtocart',fetchUser, async (req, res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
  })

  // Creating endpoint to remove cart data

  app.post('/removefromcart' ,fetchUser, async (req,res) =>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
  })
  

  // Creating endpoint to get cart data

  app.post('/getcart',fetchUser, async (req,res)=>{
    console.log('Get cart')
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
  })


  // statics files
  app.use(express.static(path.join(__dirname, './frontend/build')));

  app.get("*" , function(req,res){
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  })

  

app.listen(port, (error) => {
    if(!error)
    {
      console.log("Server Running on Port " +port)
    }else
    {
      console.log("Error :" +error)
    }
})