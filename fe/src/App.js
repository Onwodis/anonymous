import React, { useState } from 'react';
import Home from './components/home/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Chat from './components/dashboard/Chat.jsx';
import Editprofile from './components/dashboard/Profile.jsx';
import Verifymail from './components/home/Verifymail';
import Signup from './components/home/Signup.jsx';
import Login from './components/home/Login.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState({});
  const [newfriend, setNewfriend] = useState({});
  const [currentChat, setCurrentChat] = useState("");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signuppage" exact element={<Signup />} />
          <Route
            path="/loginpage"
            exact
            element={<Login user={user} setUser={setUser} />}
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
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                newfriend={newfriend}
                setNewfriend={setNewfriend}
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
    </>
  );
}

export default App;
