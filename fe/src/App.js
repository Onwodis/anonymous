import React, { useState, useEffect } from 'react';
import Home from './components/home/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Chat from './components/dashboard/Chat.jsx';
import Editprofile from './components/dashboard/Profile.jsx';
import Verifymail from './components/home/Verifymail';
import Signup from './components/home/Signup.jsx';
import Login from './components/home/Login.jsx';
import { io } from 'socket.io-client';
// import random from 'random';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ParticlesBg from 'particles-bg';

import './App.css';
// import Footer from './components/home/Footer.jsx';

function App() {
  // const ranny = random.int(1, 6);
  // console.log(ranny +" is random machine");
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState({});
  const [newfriend, setNewfriend] = useState({});
  const [currentChat, setCurrentChat] = useState('');
  const [cmessages, setMessages] = useState([]);
  const [ifmessages, setIfmessages] = useState(false);

  const ENDPOINT = 'http://localhost:3001/';

  // const socket = socketIOClient(ENDPOINT);
  const socket = io(ENDPOINT, {
    forceNew: true,
    // autoConnect: true,
  });
  // setSocket(sockets)
  // socket.userid = user.username
  // return () => socket.close();
  useEffect(() => {
    // ... other codes
    const testdata = 'im testing';

    // Emitting an event that will trigger in the backend
    socket.emit('reply', {testdata});

    // ... other codes
  }, [socket]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signuppage" exact element={<Signup />} />
          <Route
            path="/loginpage"
            exact
            element={
              <Login
                user={user}
                setUser={setUser}
                setFriends={setFriends}
                socket={socket}
              />
            }
          />
          <Route
            path="/dashboard"
            exact
            element={
              <Dashboard
                user={user}
                setUser={setUser}
                friends={friends}
                setFriends={setFriends}
                setMessages={setMessages}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                newfriend={newfriend}
                setNewfriend={setNewfriend}
                ifmessages={ifmessages}
                setIfmessages={setIfmessages}
                socket={socket}
              />
            }
          />

          <Route
            path="/chat"
            exact
            element={
              <Chat
                user={user}
                setUser={setUser}
                friends={friends}
                setFriends={setFriends}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                newfriend={newfriend}
                setNewfriend={setNewfriend}
                cmessages={cmessages}
                setMessages={setMessages}
                ifmessages={ifmessages}
                setIfmessages={setIfmessages}
                socket={socket}
              />
            }
          />
          <Route
            path="/editprofile"
            exact
            element={<Editprofile user={user} setUser={setUser} />}
          />
          <Route path="/verifymail" exact element={<Verifymail />} />
        </Routes>
      </Router>
      {/* <ParticlesBg type="lines" bg={true} duration={2}/> */}
    </>
  );
}

export default App;
