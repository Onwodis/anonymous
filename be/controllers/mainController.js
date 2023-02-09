const Users = require('../models/signUpModel');

const Products = require('../models/productsModel');
const { getTimeDiff } = require('time-difference-js');
const jwt_decode = require('jwt-decode');
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
let saveit={}
function capitalise(x) {
  var b = x.charAt(0).toUpperCase() + x.slice(1);
  return b;
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

  module.exports = {
    changepassword: async (req, res) => {
      const pwrds = req.body.pwrds
      const ifoldpwrdisnewpwrd = await bcrypt.compare(pwrds.oldpwrd,req.user.pwrd);
      if (!ifoldpwrdisnewpwrd) {
        res.json({
          signupfeedBack: {
            success: false,
            message: 'Sorry ! Current password is incorrect ',
            user: req.user,
          },
        });
      } 
      else if (pwrds.oldpwrd == pwrds.pwrd) {
        res.json({
          signupfeedBack: {
            success: false,
            message: 'Sorry ! Your new password cannot be same as Current password  ',
            user: req.user,
          },
        });
      } else {
        try {
          req.user.pwrd = await bcrypt.hash(pwrds.pwrd, 10);
          await req.user.save();

          res.json({
            signupfeedBack: {
              success: true,
              message: 'Password updated Succesfully',
              user: req.user,
            },
          });
        } catch (err) {
          res.json({
            signupfeedBack: {
              success: false,
              message: 'There was an error saving new password',
              user: req.user,
            },
          });
          console.log('There was an error saving new password ' + err.message);
        }
      }
    },
    updateusername: async (req, res) => {
      const newUsername = req.body.newUsername;
      const ifuser = await Users.findOne({username:newUsername})
      if(ifuser){
        res.json({
          signupfeedBack: {
            success: false,
            message: "Sorry ! This username "+newUsername+" is in use",
            user: req.user,
          },
        });
      }
      else{
        try {
          req.user.username = newUsername;
          await req.user.save();

          res.json({
            signupfeedBack: {
              success: true,
              message: 'Deleted Succesfully',
              user: req.user,
            },
          });
        } catch (err) {
          res.json({
            signupfeedBack: {
              success: false,
              message: err.message,
              user: req.user,
            },
          });
          console.log(
            'username to be updated is ' + newUsername + ' ' + err.message
          );
        }
      }
    },
    deleteaccount: async (req, res) => {
      const email = req.user.email;
      await Users.deleteOne({ email: email });
      res.json({
        signupfeedBack: {
          success: true,
          message: 'Deleted Succesfully',
        },
      });
    },
    search: async (req, res) => {
      const user = req.user;
      const codee = req.body.search;
      console.log(user.username, codee);
      const newfriend = await Users.findOne({ anonymous: codee });
      const friends = user.friends;

      if(codee==user.anonymous){
        res.json({
          signupfeedBack: {
            success: false,
            message: 'Lol ! You are not allowed to chat with yourself',
            friends: friends,
            user: req.user,
          }
        });
      }
      else{

        if (newfriend) {
          res.json({
            signupfeedBack: {
              success: true,
              message: user.username + ' ' + codee.search,
              friends: friends,
              newFriend: newfriend,
              user: user,
            },
          });
        }
        else {
          res.json({
            signupfeedBack: {
              success: false,
              message: 'this code is invalid',
              friends: friends,
              user:req.user
            },
          });
        }

      }


      
    },
    getan: async (req, res) => {
      res.json({
        signupfeedBack: {
          success: true,
          message: 'got new anon',
          user: req.user,
        },
      });
    },
    lastsign: async (req, res) => {
      try {
        await Users.create({
          username: saveit.username,
          pwrd: await bcrypt.hash(saveit.pwrd, 10),
          birth: saveit.birth,
          email: saveit.email,
          logintimes: 0,
          lastlogin: '',
          anonymous: require('crypto').randomBytes(5).toString('hex'),
          regDate: currentDate(),
          friends: {
            femail: null,
            fanonymous: null,
            messages: {},
          },
        });
        res.clearCookie('signuptoken');
        res.json({
          signupfeedBack: {
            success: true,
            message: 'You have successfully signed up',
          },
        });
      } catch (err) {
        console.log(err.message + ' is error');
        res.json({
          signupfeedBack: {
            success: false,
            message: err.message,
          },
        });
      }
    },
    Home: async (req, res) => {
      res.render('home');
    },
    signuppage: async (req, res) => {
      res.render('signup');
    },
    loginpage: async (req, res) => {
      res.render('login');
    },
    acceptsignup: async (req, res) => {
      const vmail = req.body.codee;
      console.log(req.headers);
      console.log('received signup vmail is ' + vmail);

      if (req.cookies.signuptoken) {
        const token = req.cookies.signuptoken;
        const hj = jwt.verify(token, process.env.SECRET, (err, decodedt) => {
          if (err) {
            console.log(err.message + ' is error ' + process.env.SECRET);
          } else {
            console.log(decodedt.testran + ' is real code');
            if (vmail == decodedt.testran) {
              saveit = decodedt;
              res.redirect('/lastsign');
            } else {
              res.json({
                signupfeedBack: {
                  success: false,
                  message: 'SOrry that was incorrect',
                },
              });
            }
          }
        });
      } else {
        res.json({
          signupfeedBack: {
            success: false,
            message: 'Authentication expired',
          },
        });
      }

      // res.send('hi');
      // console.log(' signup good');
    },
    login: async (req, res) => {
      const login = req.body.login;
      const email = login.username;
      const password = login.password;
      console.log('login is here ' + email);

      if (email.includes('.')) {
        const User = await Users.findOne({ email: email });
        if (User) {
          const pwrdMatch = await bcrypt.compare(password, User.pwrd);
          if (pwrdMatch) {
            const products = await Products.find({ email: email }).sort({
              _id: -1,
            });
            // console.log(products + ' is products on login');
            await res.cookie('Auth', User.email, {
              secure: true,
              maxAge: 1200000,
            });
            await res.cookie('seen', User.lastlogin, {
              secure: true,
              maxAge: 1200000,
            });

            const UserAgain = await Users.findOne({ email: email });

            UserAgain.logintimes++;
            UserAgain.lastlogin = UserAgain.newlogin;
            UserAgain.newlogin = currentDate();
            await UserAgain.save();
            console.log(User + ' latest object');

            res.json({
              signupfeedBack: {
                success: true,
                user: User,
              },
            });

            // console.log(seller + ' seller logged in successfully');
          } else {
            res.json({
              signupfeedBack: {
                success: false,
                message: 'Incorrect password',
              },
            });

            console.log('incorrect password');
          }
        } else {
          res.json({
            signupfeedBack: {
              success: false,
              message:
                'The user whose email is ' +
                email +
                '  does not exist,Sign-up!',
            },
          });
          console.log('incorrect email');
        }
      } else {
        const User = await Users.findOne({ username: email });
        if (User) {
          const pwrdMatch = await bcrypt.compare(password, User.pwrd);
          if (pwrdMatch) {
            const products = await Products.find({ email: email }).sort({
              _id: -1,
            });
            // console.log(products + ' is products on login');
            await res.cookie('Auth', User.email, {
              secure: true,
              maxAge: 1200000,
            });
            await res.cookie('seen', User.lastlogin, {
              secure: true,
              maxAge: 1200000,
            });

            const UserAgain = await Users.findOne({ username: email });

            UserAgain.logintimes++;
            UserAgain.lastlogin = UserAgain.newlogin;
            UserAgain.newlogin = currentDate();
            await UserAgain.save();
            console.log(User + ' latest object');

            res.json({
              signupfeedBack: {
                success: true,
                message: 'correct',
                user: User,
              },
            });

            // console.log(seller + ' seller logged in successfully');
          } else {
            res.json({
              signupfeedBack: {
                success: false,
                message: 'Incorrect password',
              },
            });

            console.log('Incorrect password');
          }
        } else {
          res.json({
            signupfeedBack: {
              success: false,
              message: 'The user with username ' + email + ' does not exist',
            },
          });
          console.log('incorrect email');
        }
      }
    },
    updateimg: async (req, res, err) => {
      let file = req.files.myFile;
      let Luser = req.cookies.Auth;
      console.log(file + ' is foo myfile');
      const fileName = file.name.split(' ').join('_');
      // const fileName = file.name;
      console.log('this is Luser mail ' + Luser);
      let fileDir = './public/uploads/';

      await file.mv(fileDir + fileName, (err) => {
        if (err) throw err;
      });

      const User = await Users.findOne({ email: Luser });
      User.img = `/uploads/${fileName}`;
      await User.save();

      const Useragain = await Users.findOne({ email: Luser });
      console.log('User again after uploading pix ' + Useragain);
      res.json({
        User: Useragain,
      });
    },
    getsellerObjectfiles: async (req, res) => {
      const Luser = req.user;
      console.log('is require.user ' + Luser);
      const user = await Signup.findOne({ email: Luser.email });
      const products = await Products.find({ email: user.email }).sort({
        _id: -1,
      });
      console.log(user + ' is users');
      console.log('he searched user not' + user);
      await res.cookie('seen', user.lastlogin, {
        secure: true,
        maxAge: 1200000,
      });

      res.json({
        rdata: {
          feedback: user,
          products: products,
          seen: user.lastlogin,
        },
      });
    },

    additem: async (req, res) => {
      const { name, brand, category, condition, description, price } = req.body;
      const pix = req.files.itempix;
      const email = req.cookies.Auth;
      const pixName = pix.name.split(' ').join('_');
      console.log(req.body, pixName);
      // await Products.deleteMany()
      const findSimilarproduct = await Products.findOne({ imageName: pixName });
      const seller = await Signup.findOne({ imageName: pixName });

      if (findSimilarproduct) {
        if (findSimilarproduct.email == email) {
          await res.json({
            signupfeedBack: {
              success: 'existence',
            },
          });
          console.log('this product already exists');
        } else {
          const productIndex = (await Products.find()).length;
          let fileDir = './public/uploads/';
          let file = req.files.itempix;

          await file.mv(fileDir + pixName, (err) => {
            if (err) throw err;
          });

          await Products.create({
            category: category,
            email: email,
            contactno: seller.number,
            name: capitalise(name),
            slug: '_',
            productSerial: require('crypto').randomBytes(5).toString('hex'),
            imageUrl: `/uploads/${pixName}`,
            imageName: pixName,
            productIndex: productIndex,
            description: description,
            quantity: 100,
            price: price,
            availability: 'available',
            taxable: false,
            isActive: true,
            brand: brand,
            condition: condition,
          });
          const products = await Products.find({
            email: req.cookies.Auth,
          }).sort({
            _id: -1,
          });
          await res.json({
            signupfeedBack: {
              success: 'save',
              products: products,
            },
          });
          const checkAllproducts = await Products.find();

          console.log(products + ' this are all my products');
        }
      } else {
        const productIndex = (await Products.find()).length;
        let fileDir = './public/uploads/';
        let file = req.files.itempix;

        await file.mv(fileDir + pixName, (err) => {
          if (err) throw err;
        });

        await Products.create({
          category: category,
          email: email,
          contactno: seller.number,
          name: capitalise(name),
          slug: '_',
          productSerial: require('crypto').randomBytes(5).toString('hex'),
          imageUrl: `/uploads/${pixName}`,
          imageName: pixName,
          productIndex: productIndex,
          description: description,
          quantity: 100,
          price: price,
          availability: 'available',
          taxable: false,
          isActive: true,
          brand: brand,
          condition: condition,
        });
        const productss = await Products.find({ email: req.cookies.Auth }).sort(
          {
            _id: -1,
          }
        );
        await res.json({
          signupfeedBack: {
            success: 'save',
            products: productss,
          },
        });
        const checkAllproducts = await Products.find();
        console.log(productss + ' this are all my products');

        // console.log(checkAllproducts);
      }

      //from above is the guy
    },
    visibility: async (req, res) => {
      const serial = req.params.productserial;
      console.log('this is product serial to be toggled now ' + serial);
      const exactProduct = await Products.findOne({ productSerial: serial });
      if (exactProduct.availability == 'available') {
        exactProduct.availability = 'inactive';
        await exactProduct.save();
        const products = await Products.findOne({ productSerial: serial });
        const productss = await Products.find({ email: req.cookies.Auth }).sort(
          {
            _id: -1,
          }
        );

        res.json({
          products: productss,
        });
        console.log('toggled succesfully ' + products.availability);
      } else {
        exactProduct.availability = 'available';
        await exactProduct.save();
        const products = await Products.findOne({ productSerial: serial });
        const productss = await Products.find({
          email: req.cookies.Auth,
        }).sort({ _id: -1 });

        res.json({
          products: productss,
        });

        // res.end();
        console.log('toggled succesfully ' + products.availability);
      }
    },
    getproductstring: async (req, res) => {
      const names = req.params.names;

      const productss = await Products.find({ name: { $regex: names } })
        .where('availability')
        .equals('available')
        .sort({ _id: -1 });
      console.log('this user typed ' + names + ' names');

      res.json({
        products: productss,
      });
    },
    getproductcategory: async (req, res) => {
      const category = req.params.category;

      if (category == 'all') {
        const productss = await Products.find()
          .where('availability')
          .equals('available')
          .sort({ _id: -1 });
        console.log('this user clicked ' + category + ' category');

        res.json({
          products: productss,
        });
      } else {
        console.log('this user clicked ' + category + ' category');

        const productss = await Products.where('category')
          .equals(category)
          .where('availability')
          .equals('available')
          .sort({ _id: -1 });

        res.json({
          products: productss,
        });
      }
    },
    deleteoneProduct: async (req, res) => {
      const serial = req.params.productserial;
      console.log('this is product serial to be toggled now ' + serial);
      await Products.deleteOne({ productSerial: serial });
      const productss = await Products.find({ email: req.cookies.Auth }).sort({
        _id: -1,
      });

      res.json({
        products: productss,
      });
    },
    deleteallProduct: async (req, res) => {
      console.log('this is products email to be deleted now ' + email);

      const email = req.cookies.Auth;
      console.log('this is products email to be deleted now ' + email);
      await Products.deleteMany({ email: email });
      const productss = await Products.find({ email: req.cookies.Auth }).sort({
        _id: -1,
      });

      res.json({
        products: productss,
      });
    },
  };
