const Users = require('../models/signUpModel');
// const random= require('random')
const Products = require('../models/productsModel');
const Friends = require('../models/friendssModel');
const Messages = require('../models/messagesModel');
const sortBy = require('sort-by')
const jwt_decode = require('jwt-decode');
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const jwt = require('jsonwebtoken');
let allfriends;
let randomn = (testran = require('crypto').randomBytes(4).toString('hex'));
let rmessages = {};
const bcrypt = require('bcryptjs');
let saveit = {};
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
function kaka() {
  var fowls = Math.floor(Math.random() * 100000 + 1);
  return fowls;
}
let messageio
// random.int(0, 100) 
module.exports = {
  // president:async (req,res)=>{
  //   if(weVote && !rigged ){
  //     const nextPresident = await HumanModel.findOne({trackRecords: true})
  //     console.log("your next president is " +nextPresident)

  //     res.render("inecResults",{
  //       layout:presidentialLayout,
  //       votingConditions:"fair",
  //       techSolutionby:"Codar Institute of Technology",
  //       internationalObservers:true,
  //       codeBiasAndpreference:false,
  //       defaultPresident:false,
  //       presidentialElectionWinner:nextPresident
  //     })
  //   }
  // },
  clearchat: async (req, res) => {
    const friendnum = parseInt(req.body.friendnum);
    console.log(friendnum + ' is friendnum');
    const receiver = await Users.findOne({ uniquenum: friendnum });

    const bond = friendnum + req.user.uniquenum;
    await Messages.deleteMany({ bond: bond });

    // req.user.friends.remove({ femail: receiver.email });
    // await req.user.save();

    const myG = await Users.findOne({ email: req.user.email });
    allfriends = myG.friends;

    if (myG.friends.length > 0) {
      const myG = await Users.findOne({ email: req.user.email });
      allfriends = myG.friends;
      res.json({
        signupfeedBack: {
          success: true,
          message: false,
          user: req.user,
          newFriend: receiver,
          rmessages: null,
          allfriends: myG.friends.reverse(),
        },
      });
    } else {
      res.json({
        signupfeedBack: {
          success: true,
          message: true,
          user: req.user,
          newFriend: receiver,
          allfriends: false,
        },
      });
    }
    console.log('pushed successfully');
  },
  disconnect: async (req, res) => {
    const friendnum = parseInt(req.body.friendnum);
    console.log(friendnum + ' is friendnum');
    const receiver = await Users.findOne({ uniquenum: friendnum });

    const bond = friendnum + req.user.uniquenum;
    // await Messages.deleteMany({ bond: bond });

    req.user.friends.remove({ femail: receiver.email });
    await req.user.save();

    const myG = await Users.findOne({ email: req.user.email });
    allfriends = myG.friends;

    if (myG.friends.length > 0) {
      const myG = await Users.findOne({ email: req.user.email });
      allfriends = myG.friends;
      res.json({
        signupfeedBack: {
          success: true,
          message: true,
          user: req.user,
          newFriend: receiver,
          allfriends: myG.friends.reverse(),
        },
      });
    } else {
      res.json({
        signupfeedBack: {
          success: true,
          message: true,
          user: req.user,
          newFriend: receiver,
          allfriends: false,
        },
      });
    }
    console.log('pushed successfully');
  },
  sendmessage: async (req, res) => {
    const { rexemail, newmessage, timee } = req.body;
    const receiver = await Users.findOne({ email: rexemail });

    const bond = receiver.uniquenum + req.user.uniquenum;
    const messages = await Messages.find({ bond: bond });

    // const lastfriendindex = await Friends.findOne({}).sort({ chatIndex: -1 });

    // const infriendlist = await Friends.where('iam')
    //   .equals(rexemail)
    //   .where('andmyfriendis')
    //   .equals(req.user.email);
    // if (!infriendlist) {
    //   if (lastfriendindex) {
    //     await Friends.create({
    //       iam: rexemail,
    //       username: receiver.username,
    //       andmyfriendis: req.user.email,
    //       common: req.user.email + rexemail,
    //       chatIndex: lastfriendindex + 1,

    //     });
    //   } else {
    //     await Friends.create({
    //       iam: rexemail,
    //       username: receiver.username,
    //       andmyfriendis: req.user.email,
    //       common: req.user.email + rexemail,
    //       chatIndex: 1,
    //     });
    //   }
    // } else {
    //   if (lastfriendindex) {
    //     const sea = lastfriendindex.chatIndex + 1;
    //     console.log('lastfriendindex is ' + lastfriendindex.chatIndex + " "+ sea);
    //     await Friends.deleteOne({ common: req.user.email + rexemail });
    //     await Friends.create({
    //       iam: rexemail,
    //       username: receiver.username,
    //       andmyfriendis: req.user.email,
    //       common: req.user.email + rexemail,
    //       chatIndex: sea,
    //     });

    // if (lastfriendindex) {
    //   await Friends.create({
    //     iam: rexemail,
    //     username: receiver.username,
    //     andmyfriendis: req.user.email,
    //     common: req.user.email + rexemail,
    //     chatIndex: lastfriendindex + 1,
    //   });
    // } else {
    //   await Friends.create({
    //     iam: rexemail,
    //     username: receiver.username,
    //     andmyfriendis: req.user.email,
    //     common: req.user.email + rexemail,
    //     chatIndex: 1,
    //   });
    // }

    // await infriendlist.save();
    // } else {
    //   infriendlist.chatIndex = 1;
    //   await Friends.create({
    //     iam: rexemail,
    //     username: receiver.username,
    //     andmyfriendis: req.user.email,
    //     common: req.user.email + rexemail,
    //     chatIndex: 1,
    //   });
    //   console.log('in else loop');
    // }

    const howManyMessages = messages.length;
    // req.user.messageList = req.user.messageList;
    await Messages.create({
      messagedate: currentDate(),
      time: timee,
      message: newmessage,
      messageid: randomn,
      bond: req.user.uniquenum + receiver.uniquenum,
      messageindex: howManyMessages + 1,
      memail: req.user.email,
      manonymous: req.user.anonymous,
      common: req.user.email + rexemail,
      from: req.user.email,
      to: rexemail,
    });

    // req.user.messageList = req.user.messageList;

    req.user.friends.remove({ femail: receiver.email });
    req.user.lastseen = currentDate();
    await req.user.save();

    receiver.friends.remove({ femail: req.user.email });
    await receiver.save();
    const friendslength = req.user.friends.length;
    const rfriendslength = receiver.friends.length;
    const recmessages =  await Messages.countDocuments({bond: bond ,from:receiver.email})
    const sentmessages = await Messages.countDocuments({ bond: bond, from: req.user.email })
    const allsentmessages = await Messages.countDocuments({from: req.user.email})
    const allrecmessages = await Messages.countDocuments({ to: req.user.email});

    const frienddets = {
      fusername: receiver.username,
      lastmessage: newmessage,
      femail: receiver.email,
      recmessages: recmessages,
      sentmessages: sentmessages,
      chatIndex: friendslength + 1,
    };
    const rfrienddets = {
      fusername: req.user.username,
      lastmessage: newmessage,
      femail: req.user.email,
      chatIndex: rfriendslength + 1,
      sentmessages: recmessages,
      recmessages: sentmessages,
    };

    req.user.friends.push(frienddets);
    req.user.allsentmessages = allsentmessages;
    req.user.allrecmessages = allrecmessages;
    await req.user.save();
    receiver.friends.push(rfrienddets);
    await receiver.save();
    const messagess = await Messages.find({ bond: bond });
    const myG = await Users.findOne({ email: req.user.email });
    allfriends = myG.friends;
    messageio = {
      message:newmessage,
      time:timee,
      from:req.user.email,
      to:rexemail,
    }

    if (myG.friends.length > 0) {
      const myG = await Users.findOne({ email: req.user.email });
      console.log("line 278")
      allfriends = myG.friends;
      const receiverb = await Users.findOne({ email: rexemail });

      res.json({
        signupfeedBack: {
          success: true,
          message: true,
          user: req.user,
          newFriend: receiverb,
          rmessages: messagess,
          allfriends: myG.friends.reverse(),
        },
      });
    } else {
      console.log('line 293')
      console.log('pushed successfully');

      res.json({
        signupfeedBack: {
          success: true,
          message: true,
          user: req.user,
          newFriend: receiverb,
          rmessages: messagess,
          allfriends: false,
        },
      });
    }
  },
  goto: async (req, res) => {
    const email = req.body.emails;
    const receiver = await Users.findOne({ email: email });
    const bond = receiver.uniquenum + req.user.uniquenum;
    const myG = await Users.findOne({ email: req.user.email });
    const messagess = await Messages.find({ bond: bond });
    const socketid = req.body.socketid

    console.log(socketid + " meet socketid")

    req.user.socketid = socketid
    await req.user.save()
    // console.log('good job ' + messagess[0]);

    if (messagess.length > 0) {
      res.json({
        signupfeedBack: {
          success: true,
          message: true,
          user: req.user,
          newFriend: receiver,
          rmessages: messagess,
          allfriends: myG.friends.reverse(),
        },
      });
    } else {
      res.json({
        signupfeedBack: {
          success: true,
          message: false,
          user: req.user,
          newFriend: receiver,
          rmessages: messagess,
          allfriends: myG.friends.reverse(),
        },
      });
    }
  },
  changepassword: async (req, res) => {
    const pwrds = req.body.pwrds;
    const ifoldpwrdisnewpwrd = await bcrypt.compare(
      pwrds.oldpwrd,
      req.user.pwrd
    );
    if (!ifoldpwrdisnewpwrd) {
      res.json({
        signupfeedBack: {
          success: false,
          message: 'Sorry ! Current password is incorrect ',
          user: req.user,
        },
      });
    } else if (pwrds.oldpwrd == pwrds.pwrd) {
      res.json({
        signupfeedBack: {
          success: false,
          message:
            'Sorry ! Your new password cannot be same as Current password  ',
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
    const ifuser = await Users.findOne({ username: newUsername });
    if (ifuser) {
      res.json({
        signupfeedBack: {
          success: false,
          message: 'Sorry ! This username ' + newUsername + ' is in use',
          user: req.user,
        },
      });
    } else {
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
    const friends = user.friends.sort(sortBy('-chatIndex'));

    const newfriend = await Users.findOne({ anonymous: codee });
    if (codee == user.anonymous) {
      res.json({
        signupfeedBack: {
          success: false,
          message: 'Lol ! You are not allowed to chat with yourself',
          friends: friends,
          user: req.user,
        },
      });
    } else {
      if (newfriend) {
        const bond = newfriend.uniquenum + req.user.uniquenum;

        const cmessages = await Messages.find({
          bond: bond,
        });
        

        //check if they have ever chatted
        // const cmessages = await Messages.find()
        if (cmessages.length > 0) {
          res.json({
            signupfeedBack: {
              success: true,
              message: true,
              friends: friends,
              newFriend: newfriend,
              user: user,
              rmessages: cmessages,
            },
          });
          console.log('message exists ' + cmessages[0]);
        } else {
          res.json({
            signupfeedBack: {
              success: true,
              message: false,
              friends: friends,
              newFriend: newfriend,
              user: user,
              rmessages: '',
            },
          });
          console.log(
            'messages do not exist ' + cmessages[0] + newfriend.email
          );
        }
      } else {
        // console.log('message exists ' + cmessages);

        res.json({
          signupfeedBack: {
            success: false,
            message: 'this code is invalid',
            friends: friends,
            user: req.user,
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
        uniquenum: kaka(),
        anonymous: require('crypto').randomBytes(5).toString('hex'),
        regDate: currentDate(),
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
    const socketid = login.socketid;
    // console.log('login is here ' + email);

    if (email.includes('.')) {
      const User = await Users.findOne({ email: email });
      if (User) {
        const pwrdMatch = await bcrypt.compare(password, User.pwrd);
        if (pwrdMatch) {
          await res.cookie('Auth', User.email, {
            secure: true,
            
          });
          await res.cookie('seen', User.lastlogin, {
            secure: true,
            // maxAge: 1200000,
          });
          await res.cookie('online', 'fdfgljkj', {
            secure: true,
            // maxAge: 60000,
          });

          const UserAgain = await Users.findOne({ email: email });
          const Tusers = await Users.find().length;

          UserAgain.tusers = Tusers;

          UserAgain.logintimes++;
          UserAgain.lastlogin = UserAgain.newlogin;
          UserAgain.newlogin = currentDate();
          UserAgain.socketid = socketid;
          UserAgain.online = true
          await UserAgain.save();
          // console.log(User + ' latest object');
          let allfriends = UserAgain.friends;
          if (allfriends.length > 0) {
            allfriends = UserAgain.friends;
            // console.log(allfriends + ' latest friends');

            res.json({
              signupfeedBack: {
                success: true,
                user: User,
                allfriends: allfriends.reverse(),
              },
            });
          } else {
            res.json({
              signupfeedBack: {
                success: true,
                user: User,
                allfriends: false,
              },
            });
          }

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
    else {
      const User = await Users.findOne({ username: email });
      if (User) {
        const pwrdMatch = await bcrypt.compare(password, User.pwrd);
        if (pwrdMatch) {
          await res.cookie('Auth', User.email, {
            secure: true,
            // maxAge: 1200000,
          });
          await res.cookie('seen', User.lastlogin, {
            secure: true,
            // maxAge: 1200000,
          });
          await res.cookie('online', "fdfgljkj", {
            secure: true,
            // maxAge: 60000,
          });

          const UserAgain = await Users.findOne({ username: email });
          const Tusers = await Users.find();

          UserAgain.tusers = Tusers.length;
          // console.log(Tusers.length + ' are the total users');

          UserAgain.logintimes++;
          UserAgain.lastlogin = UserAgain.newlogin;
          UserAgain.newlogin = currentDate();
          UserAgain.socketid = socketid;
          UserAgain.online = true;

          await UserAgain.save();
          console.log(socketid + ' is latest sockid after login from backend');
          let allfriends = UserAgain.friends;
          if (allfriends.length > 0) {
            allfriends = UserAgain.friends;
            // console.log(allfriends + ' latest friends');

            res.json({
              signupfeedBack: {
                success: true,
                user: User,
                allfriends: allfriends.reverse(),
              },
            });
          } else {
            res.json({
              signupfeedBack: {
                success: true,
                user: User,
                allfriends: false,
              },
            });
          }

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
      const productss = await Products.find({ email: req.cookies.Auth }).sort({
        _id: -1,
      });
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
      const productss = await Products.find({ email: req.cookies.Auth }).sort({
        _id: -1,
      });

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
  messageio
};
