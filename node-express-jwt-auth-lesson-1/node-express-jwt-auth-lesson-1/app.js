const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const bodyParser=require('body-parser')
const app = express();
const data=require('./models/contactform');
const doctor =require('./models/doctor')
// const router=require('./routes/api')
app.use(bodyParser.urlencoded({extended:true}))

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = ' mongodb+srv://varshney:Sj55888@cluster0.jqzobx2.mongodb.net/)JWT_AUTH?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(9000,()=>{
  console.log('running on port 9000');
}))
.catch((err) => console.log("yash",err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.get('/vacc', requireAuth, (req, res) => res.render('vacc'));
app.get('/book', requireAuth, (req, res) => res.render('book'));
app.get('/bed', requireAuth, (req, res) => res.render('bed'));
app.get('/doctor', requireAuth, (req, res) => res.render('doctor'));
app.get('/confirmation', requireAuth, (req, res) => res.render('confirmation'));
app.get('/bloodDonor', requireAuth, (req, res) => res.render('bloodDonor'));
app.post('/',requireAuth,async (req,res)=>{
  try {
    let newdata=new data({
      name:req.body.name,
      Mobile:req.body.number,
      email:req.body.email,
      date:req.body.date
    });
    newdata.save();
    // console.log(prompt("done"));
    // window.prompt("done")
    res.redirect('/');
    console.log(req.body);
    
  } catch (error) {
    console.log(error);
  }
})
app.post('/doctor',requireAuth,async(req,res)=>{
try {
  let Doctor=new doctor({
    title:req.body.title,
    firstName: req.body.firstName,
    lastName:req.body.lastName,
  dob: req.body.dob,
  gender: req.body.gender,
  email:req.body.email
  })
  Doctor.save();
  res.redirect('/');
} catch (error) {
  console.log(error);
}
})
app.use(authRoutes);
// app.use('/api/v1',router)
