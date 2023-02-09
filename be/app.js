const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const dotenv = require('dotenv');
const dotenvb = require('dotenv').config();
const bodyParser = require('body-parser');
// const emailjs = require('emailjs');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { setUser } = require('./middlewares/setUser');
const exphbs = require('express-handlebars');
const Users = require('./models/signUpModel');

// import { SMTPClient } from 'emailjs';


const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');

try{
  mongoose.connect(process.env.MYSTRING)
  .then(()=>{
  console.log("connected to Db successfully")
  })
}
catch(err){
  console.log("couldnt connect becos "+ err.message)
}

// app.use(bcrypt());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser('your-secret'));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './public/uploads',
  })
);
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set('view engine', 'hbs');

app.use(setUser)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.json({
    type: ['application/x-www-form-urlencoded', 'application/json'],
  })
);
// app.use(bila)

app.use('/', homeRoutes);
// app.use(emailjs);
app.use('/productroutes', productRoutes);

const PORT = 7501;

// app.get('/', async (req, res) => {
//   res.send(`Hi you are welcome`);
// });
setInterval( async(res)=>{
  const users= await Users.find() 
  users.map(
    (el) => {
      el.anonymous = require('crypto').randomBytes(5).toString('hex')
      el.save()
    }
  );
  // console.log(users + " has been updated successfully");
},120000)
app.listen(PORT, (req, res) => {
  console.log(`i am listening at port ${PORT}`);
});
