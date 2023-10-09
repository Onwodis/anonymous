const fs = require('fs');
const http = require('http');
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
const cors = require("cors");
const Users = require('./models/signUpModel');
const socketIo = require('socket.io');
const {Server} = require('socket.io');
const Messages = require('./models/messagesModel')
// const { messageio } = require('./controllers/mainController');

// import { SMTPClient } from 'emailjs';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const signUpModel = require('./models/signUpModel');

try {
  mongoose
    .connect(process.env.MYSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to Db successfully');
    });
} catch (err) {
  console.log('couldnt connect becos ' + err.message);
}

// app.use(bcrypt());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use(cookieParser('your-secret'));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './public/uploads',
  })
);
// app.engine(
//   'hbs',
//   exphbs.engine({
//     extname: '.hbs',
//     defaultLayout: 'main',
//     runtimeOptions: {
//       allowProtoMethodsByDefault: true,
//       allowProtoPropertiesByDefault: true,
//     },
//   })
// );
// app.set('view engine', 'hbs');

app.use(setUser);
// app.use(cors());

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
app.use('/productroutes', productRoutes);

const PORT = process.env.PORT;

// app.get('/', async (req, res) => {
//   res.send(`Hi you are welcome`);
// });
setInterval(async (res) => {
  const users = await Users.find();
  users.map((el) => {
    el.anonymous = require('crypto').randomBytes(5).toString('hex');
    el.save();
  });
  // console.log(users + " has been updated successfully");
}, 300000);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', "POST"],
    // credentials: true,
  },
});
// const io = require('socket.io')(server,{transports: ['websocket']});



// global.onlineUsers = new Map();

let interval;
var connectedusers= []
// const consocks= new Set()
// io.on('connect',  (socket) => {
//   socket.on('reply', ({testdata}) => {
//     console.log('a reply detected! '+testdata)
//   });
//   socket.on('add_user', ({objectlog}) => {

//     // const id = socket.handshake.query.id;
//     socket.join(objectlog.username);

//     // socket.username=(objectlog.username);
//     // connectedusers[objectlog.username]= socket
//     console.log(objectlog.username + ' has the socket id ' + socket.id);

//     console.log(
//       objectlog.username + ' has been added to room ' + objectlog.username +" in sockets "+ socket
//     );
//     // console.log(
//     //   "this is socket " + socket.id
//     // )
//   });
//   socket.on('sendMessage', async( tosend ) => {
//     // if (connectedusers.hasOwnProperty(tosend.tousername)) {
//     //   socket.in(tosend.tousername).emit('chatt', tosend);
//     // }
//     socket.to(tosend.tousername).emit('chatt', tosend);
//     console.log(
//       tosend.message + ' is message sent to socket ' + tosend.tousername
//     );

//   });
//   // socket.on('joinroom', ({ bond, email}) => {
//   //   const user = { bond, email };
//   //   // if(error)return callback(error)
//   //   socket.join(bond);

//   //   console.log(user.email + ' has been added to room ' + bond);
//   // });
//   // if (interval) {
//   //   clearInterval(interval);
//   // }
//   // interval = setInterval(() => getApiAndEmit(socket), 500);
//   socket.on('notification', ({ title }) => {
//     socket.broadcast.emit('noti',(title)) //allows you send to everyone but yourself
//     console.log(title + ' is notifications')
//   });

//   socket.on('disconnect', async({user}) => {
//     console.log(socket.id + ' Client disconnected');
//     // consocks.delete(socket)
//   })
// });
const connectedClients = {}; // Object to store socket IDs

io.on('connection', (socket) => {
  connectedusers.push( socket)
  console.log(
    'A user connected now ' + socket.id + ' ' + connectedusers.length
  );



  // Handle chat messages
  socket.on('chatMessage', async (data) => {
    console.log('new message sensed ' + data.message);

    // io.emit('chatt', data); // Broadcast the message to all connected clients
    if (connectedClients[data.friendsocketid]) {
      connectedClients[data.friendsocketid].emit('chatt',data);
      console.log(data.friendsocketid + ' is friendsocketid');
    } else {
        console.log(data.friendsocketid + ' friends socketid doesnt exist');

    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected ');
  });
});


server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

