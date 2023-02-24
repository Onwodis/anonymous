const Users = require('../models/signUpModel');
const vmail = require('../models/verificationMail');
const bcrypt = require('bcryptjs');
const Products = require('../models/productsModel');
const jwt = require('jsonwebtoken');

function capitalise(x) {
  var b = x.charAt(0).toUpperCase() + x.slice(1);
  return b;
}

function kaka() {
  var fowls = Math.floor(Math.random() * 100000 + 1);
  return fowls;
}

function currentDate() {
  let ddate = new Date();
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let dateFormat = weekday[ddate.getDay()] + ',' + ddate.toLocaleString();
  return dateFormat;
}

function remove_score(x) {
  const b = x.split('_').join(' ');
  return b;
}
var kakas = kaka();



let testran;
let firstName;
let lastName;

let numberr;
let email;
let pwrdd;
let bizz;

function removeSpacesFromFile(x) {
  let pixwithoutextension = x.split(' ');
  let pixwordnameswithspaces = pixwithoutextension[0];
  let lname = pixwithoutextension[1];
  // console.log(pixName, extension);
  let wordArray = pixwordnameswithspaces.split(' ');
  let pixname = wordArray.join('_');
  let namewewilluse = pixname + '_' + lname;

  return namewewilluse;
}

const signupMw = async (req, res, next) => {
  // await Signup.deleteMany();
  const { username, email, pwrd, cpwrd, birth } = req.body;

  console.log('this is pwrd ' + pwrd);
  const ifEmail = await Users.findOne({ email: email });
  const ifUsername = await Users.findOne({ username });

  if (pwrd == cpwrd) {
    try {
      const hpwrd = await bcrypt.hash(pwrd, 10);
      testran = require('crypto').randomBytes(8).toString('hex');
      console.log('im here');

      await Users.create({
        email: email,
        pwrd: pwrd,
        username: username,
        birth: birth,
      }).then(async () => {
        await Users.deleteOne({ email: email });
        console.log(email + ' deleted successfully');

        // testran = require('crypto').randomBytes(5).toString('hex');
        testran = kaka().toString();
        console.log('TESTRAN is of ' + typeof testran + ' type');

        vmail.mail(username, email, testran, pwrd, birth);
        console.log(testran + ' is code');
        console.log(email + ' is mail address');
        
        const object = {
          email: email,
          pwrd: pwrd,
          username: username,
          birth: birth,
          testran: testran,
        };
        
        const secret = process.env.SECRET;
        const accessToken = jwt.sign(object,secret,{expiresIn:3600});
        res.cookie('signuptoken', accessToken, {
          maxAge: 6767620000,
        });
        res.json({
          signupfeedBack: {
            success: true,
            message: 'verify your account via mail sent ' + testran,
          },
        });
      });
      // vmail.mail(incomingName, email, testran, pwrdd, numberr, bizz);
      // console.log(testran);
      // res.json({
      //   signupfeedBack: {
      //     success: true,
      //     message: 'verify your account via mail sent ' + testran,
      //   },
      // });

      // setTimeout(function () {
      //   testran = 'we outside';
      // }, 60000);
    } catch (err) {
      console.log('error ' + err.message);
      res.json({
        signupfeedBack: {
          success: false,
          message: err.message,
        },
      });
    }
  } else {
    res.render('signup', {
      alert: 'Passwords do not match',
    });
  }

  // if (ifEmail) {
  //   res.json({
  //     signupfeedBack: {
  //       success: false,
  //       message: 'Email already exists',
  //     },
  //   });
  //   console.log('email exists');
  // } else {
  //   // await Signup.create({ email: email });
  //   // noli@mailinator.com
  //   // let vcode = kaka()
  //   if (ifBiz) {
  //     res.json({
  //       signupfeedBack: {
  //         success: false,
  //         message: 'Business name already exists',
  //       },
  //     });
  //   } else {

  //   }

  //   // next()
  //   // console.log( "data is about to be saved")
  // }
};

const icheckedmail = async (req, res) => {
  const incomingData = req.params.trans;

  const dataArray = incomingData.split('-');

  const savedTrans = dataArray[0];
  const femail = dataArray[1];
  const fname = dataArray[2];
  const fpwrd = await bcrypt.hash(dataArray[3], 10);
  console.log(fpwrd + ' bcrypt');
  const fnumber = dataArray[4];
  const fbiz = dataArray[5];

  if (savedTrans == testran) {
    await Users.create({
      name: fname,
      biz: fbiz,
      img: null,
      email: femail,
      number: fnumber,
      password: fpwrd,
      regdate: currentDate(),
      randno: require('crypto').randomBytes(8).toString('hex'),
      logintimes: 0,
      lastlogin: currentDate(),
      sn: require('crypto').randomBytes(4).toString('hex'),
    });
    // res.redirect('https://samuelonwodi.netlify.app');
    res.redirect('http://localhost:3000/registered/success');
    // console.log('perfectly done ' + req.params.trans);
  } else {
    console.log('this is an error');
    // res.send('expired');
    res.redirect('http://localhost:3000/registered/expired');
  }
};
const checkUser = async (req, res, next) => {
  const auth = req.cookies.Auth;
  const online = req.cookies.online;

  if (auth) {
    const currentUser = await Users.findOne({ email: auth });

    req.user = currentUser;
    await res.cookie('Auth', auth, {
      secure: true,
      maxAge: 1200000,
    })


    if(online){
      await res.cookie('online', online, {
        secure: true,
        maxAge: 60000,
      });
    }
    else{
      req.user.online=false
      req.user.save()
    }

    
    // console.log('cookies has been reset to 5 mins');



    next();
  } else {
    
    req.user = null;

    res.json({
      signupfeedBack: {
        success: false,
        message: 'expired',
      },
    });
    console.log('he came here');
  }
};
const additemware = async (req, res, next) => {
  const auth = req.cookies.Auth;

  if (auth) {
    const currentUser = await Users.findOne({ email: auth });

    req.user = currentUser;
    console.log('he just left here');

    next();
  } else {
    req.user = null;

    res.json({
      signupfeedBack: {
        success: false,
        message:'expired'
      }
    });
    console.log('he came here');
  }
};
const checkauth = async (req, res, next) => {
  const auth = req.cookies.Auth;

  if (auth) {
    const currentUser = await Signup.findOne({ email: auth });

    req.user = currentUser;
    // console.log('he just left here');

    next();
  } else {
    req.user = null;

    await res.json({
      signupfeedBack: {
        success: 'expired',
      },
    });
    // console.log('he came here');
  }
}

module.exports = { signupMw, icheckedmail, checkUser, additemware, checkauth };
