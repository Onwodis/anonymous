const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const {
  signupMw,
  icheckedmail,
  checkauth,
} = require('../middlewares/signupMw');
const Signup = require('../models/signUpModel');


router.get('/visibility/:productserial', checkauth, mainController.visibility);
router.get('/deleteone/:productserial',checkauth, mainController.deleteoneProduct);
router.get(
  '/getproductcategory/:category',
  mainController.getproductcategory
);
router.get('/getproductstring/:names', mainController.getproductstring)
// console.log('im in productRouter')
module.exports = router;
