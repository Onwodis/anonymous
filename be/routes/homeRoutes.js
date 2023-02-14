const express= require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const {signupMw,icheckedmail,checkUser,additemware} = require('../middlewares/signupMw')
const Signup = require('../models/signUpModel');




router.post('/signup',signupMw);
router.post('/savesignup', mainController.acceptsignup);
router.post('/search',checkUser, mainController.search);
router.get('/getan', checkUser,mainController.getan);
router.get('/deleteaccount', checkUser, mainController.deleteaccount);
router.post('/updateusername', checkUser, mainController.updateusername);
router.post('/changepassword', checkUser, mainController.changepassword);
router.post('/sendmessage', checkUser, mainController.sendmessage);
router.post('/login', mainController.login);
router.post('/updateimg', mainController.updateimg);
router.get('/lastsign', mainController.lastsign);
router.post('/additem',additemware, mainController.additem);
// router.get('/icheckedmail/:trans', icheckedmail);
router.get('/', mainController.Home);
router.get('/loginpage', mainController.loginpage);
router.get('/signuppage', mainController.signuppage);
// router.get('/visibility/:productserial', mainController.visibility);
router.get('/getsellerObjectfiles',checkUser, mainController.getsellerObjectfiles);
router.get('/delete', async(req,res)=>{
  await Signup.deleteMany();
  res.send('deleted successfully')

});







module.exports = router;