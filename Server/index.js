const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('./models/Users')
const ProductModel = require('./models/Product')

const SCREAT_KEY = "Umair"
const app = express(

)
app.use(cors())
app.use(express.json(

))
mongoose.connect('mongodb://localhost:27017/FastFood')

app.post('/adduser', async (req, res) => {
    const {name, email , city, phonenumber, password} =req.body;
    const passwordhash = await bcrypt.hash(password, 10)
    const user = new UserModel({name, email,phonenumber, city,password:passwordhash});
    await user.save();
    res.json(user)
})

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    if (!user){
        return res.json({'status': 'nouser'})

    }

    const pass = await bcrypt.compare(password, user.password)
    
    if (!pass){
        return res.json({'status':'nopass'})
    }
    
    const token = jwt.sign({userId : user._id, user : user},SCREAT_KEY,{expiresIn:'5h'})
    console.log(token)
    res.json({token});
})

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.json({'Status':'fail1'});
    }

    jwt.verify(token, SCREAT_KEY, (err, user) => {
      if (err) {
        return res.json({'Status':'fail2'});
      }

      req.user = user;
      
      next();
    });
  };
  
  // Protected Route (e.g., Dashboard)
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!', user: req.user });
  });

app.get('/getuser', (req, res) => {
    UserModel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}
)

app.delete('/deletedata:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.put('/dataupdate:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, city: req.body.city, email: req.body.email,phonenumber: req.body.phonenumber})
        .then(user => res.json(user))
        .catch(err => res.json(err))
})
// Product Addition:
app.post('/addproduct', async (req, res) => {
    const {productname,price,rating,stock,link,discription,quantity} = req.body
    

    const product = new ProductModel({productname,price,rating,stock,images:link,discription,quantity} )
    await product.save()
    if (product){
        res.json(product)

    }
    else {
        res.json({'status':'fail'})

    }





})
app.get('/getproducts', (req, res) => {
    ProductModel.find({})
        .then(product => res.json(product))
        .catch(err => res.json(err))

})
app.post('/getoneproduct', async (req, res) => {
    try {
        const { id } = req.body;

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product)
            ;
    } catch (err) {
        res.status(500).send('Error fetching product');
    }
});
app.get('/l', (req, res) => {
    res.send('hello')
})
app.listen(3001, () => {
    console.log("server is running")

})
