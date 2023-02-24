import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useToast } from '@chakra-ui/react';
import Anonymous from '../../anonymous.png';
import './Chat.css';
// import {socket} from '../../components/home/Login.jsx'
// import {socket} from "./"
import mAnonymous from '../../main_anonymous.png';
// import {
//   host,
//   recieveMessageRoute,
//   sendMessageRoute,
// } from '../../utils/APIRoutes';
// import ParticlesBg from 'particles-bg';

const Chat = ({
  user,
  setUser,
  friends,
  setFriends,
  currentChat,
  setCurrentChat,
  newfriend,
  setNewfriend,
  setMessages,
  cmessages,
  ifmessages,
  setIfmessages,
  socket,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typed, setTyped] = useState('');
  const [disc, setDisc] = useState(0);
  const [clear, setClear] = useState(0);
  const [sure, setSure] = useState('Clear Chats');
  const [talk, setTalk] = useState(
    'Disconnect ' + capitalise(newfriend.username)
  );

  const Scrold = (e) => {
    e.preventDefault();

    var elem = document.getElementById('scrohld');
    elem.scrollTop = elem.scrollHeight;
    // if (elem.scrollHeight > 40) {
    //   window.scrollTo(0, elem.scrollHeight);
    // }

    document.getElementById('foch').focus();
  };
  console.log('my socket id is ' + socket.id);
  // alert(newfriend.username+ " is newfriend")

  useEffect(() => {
    socket.on('nma', (tosend) => {
      if (tosend.from === newfriend.email) {
        // setMessages([...cmessages, tosend])
        Scrold()
        
        // alert(' new message received ' + tosend.message);
      }

    })
    socket.on('noti', (data) => {
      
      console.log(' this is notification ' + data);
    });
  }, [socket]);

  const ClearChat = (e) => {
    e.preventDefault();
    if (ifmessages === true) {
      if (clear === 0) {
        setClear(1);

        console.log('is clicked and set to ' + clear);
        setSure('Are you sure ?');
        setTimeout(function () {
          setClear(0);
          setSure('Clear Chats');
        }, 5000);
      } else {
        setClear(0);
        setSure('Clear Chats');
        console.log('is clicked and returned to ' + clear);

        axios
          .post('/clearchat', { friendnum: newfriend.uniquenum })
          .then((res) => {
            if (res.data.signupfeedBack.success) {
              setUser(res.data.signupfeedBack.user);
              // setNewfriend(res.data.signupfeedBack.newFriend);
              setMessages(res.data.signupfeedBack.rmessages);
              setIfmessages(res.data.signupfeedBack.message);
              setFriends(res.data.signupfeedBack.allfriends);

              // navigate('/dashboard');
              // swal({
              //   title: 'Disconnected !',
              //   text: capitalise(newfriend.username) + ' has been disconnected',
              //   icon: 'success',
              //   button: 'Ok!',
              // });
            } else if (res.data.signupfeedBack.message === 'expired') {
              swal({
                title: 'Login expired !',
                text: 'authentication expired',
                icon: 'error',
                button: 'Ok!',
              });
              console.log('ok ' + res.data.signupfeedBack.message);

              navigate('/loginpage');
            } else {
              swal({
                title: 'Error !',
                text: 'Sorry there was an error performing this action',
                icon: 'error',
                button: 'Ok!',
              });
            }
          });
      }
    }
  };
  const Disconnect = (e) => {
    e.preventDefault();
    if (disc === 0) {
      setDisc(1);

      console.log('is clicked and set to ' + disc);
      setTalk('Click Again');
      setTimeout(function () {
        setDisc(0);
        setTalk('Disconnect ' + capitalise(newfriend.username));
      }, 3000);
    } else {
      setDisc(0);
      setTalk('Disconnect ' + capitalise(newfriend.username));
      console.log('is clicked and returned to ' + disc);

      axios
        .post('/disconnect', { friendnum: newfriend.uniquenum })
        .then((res) => {
          if (res.data.signupfeedBack.success) {
            setUser(res.data.signupfeedBack.user);
            // setNewfriend(res.data.signupfeedBack.newFriend);
            setMessages(res.data.signupfeedBack.rmessages);
            setIfmessages(res.data.signupfeedBack.message);
            setFriends(res.data.signupfeedBack.allfriends);

            navigate('/dashboard');
            swal({
              title: 'Disconnected !',
              text: capitalise(newfriend.username) + ' has been disconnected',
              icon: 'success',
              button: 'Ok!',
            });
          } else if (res.data.signupfeedBack.message === 'expired') {
            swal({
              title: 'Login expired !',
              text: 'authentication expired',
              icon: 'error',
              button: 'Ok!',
            });
            console.log('ok ' + res.data.signupfeedBack.message);

            navigate('/loginpage');
          } else {
            swal({
              title: 'Error !',
              text: 'Sorry there was an error performing this action',
              icon: 'error',
              button: 'Ok!',
            });
          }
        });
    }
  };
  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const Gettyped = (e) => {
    e.preventDefault();
    setTyped(e.target.value);
  };
  // console.log(
  //   'yes ' + currentChat + ' is currently on chat with ' + user.email
  // );
  const SendMesaage = (e) => {
    e.preventDefault();
    if (typed !== '' && typed !== ' ') {
      const timee =
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes();
      const tosend = {
        message: capitalise(typed),
        to: newfriend.email,
        from: user.email,
        socketid: newfriend.socketid,
        tousername: newfriend.username.toLowerCase(),
        time: timee,
      }

      axios
        .post('/sendmessage', {
          newmessage: capitalise(typed),
          rexemail: currentChat,
          timee: timee,
        })
        .then((res) => {
          if (res.data.signupfeedBack.success) {
            setUser(res.data.signupfeedBack.user);
            setNewfriend(res.data.signupfeedBack.newFriend);
            setMessages(res.data.signupfeedBack.rmessages);
            setIfmessages(res.data.signupfeedBack.message);
            setFriends(res.data.signupfeedBack.allfriends);
            setSure('Clear Chats');
            
            socket.emit('sendMessage', tosend);

            setTyped('');

            // console.log('ok ' + res.data.signupfeedBack.newFriend.username);
            // console.log(
            //   res.data.signupfeedBack.rmessages[0] + ' is mess index 0'
            // );
          } else if (res.data.signupfeedBack.message === 'expired') {
            swal({
              title: 'Login expired !',
              text: 'authentication expired',
              icon: 'error',
              button: 'Ok!',
            });
            console.log('ok ' + res.data.signupfeedBack.message);

            navigate('/loginpage');
          } else {
            swal({
              title: 'Error !',
              text: 'Sorry this chat code is invalid',
              icon: 'error',
              button: 'Ok!',
            });
          }
        });
      // const socket = socketIOClient(ENDPOINT);

      // socket.emit('smessage', {
      //   text: typed,
      //   to: newfriend.email,
      //   from: user.email,
      //   id: `${socket.id}${Math.random()}`,
      //   socketID: socket.id,
      // });
      console.log(socket.id + ' is socketid');
    } else {
      swal({
        title: 'Input is empty !',
        text: 'Type message',
        icon: 'error',
        button: 'Ok!',
      });
    }
  };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [cmessages]);

  const Searchsubmit = (e) => {
    e.preventDefault();

    if (search !== '') {
      axios.post('/search', { search: search }).then((res) => {
        if (res.data.signupfeedBack.success) {
          setUser(res.data.signupfeedBack.user);
          setNewfriend(res.data.signupfeedBack.newFriend);
          setMessages(res.data.signupfeedBack.rmessages);
          setIfmessages(res.data.signupfeedBack.message).then(() => {
            navigate('/chat');
          });
          // alert(res.data.signupfeedBack.message);
        } else if (res.data.signupfeedBack.message === 'expired') {
          swal({
            title: 'Login expired !',
            text: 'authentication expired',
            icon: 'error',
            button: 'Ok!',
          });
          console.log('ok ' + res.data.signupfeedBack.message);

          navigate('/loginpage');
        } else {
          swal({
            title: 'Error !',
            text: 'Sorry this chat code is invalid',
            icon: 'error',
            button: 'Ok!',
          });
        }
      });
    }
  };
  function capitalise(x) {
    var b = x.charAt(0).toUpperCase() + x.slice(1);
    return b;
  }

  if (ifmessages) {
    console.log('this is ifmessages ' + ifmessages);
    return (
      <div>
        <section className="dashboard  section">
          <div className="container">
            <div class="row makefixed">
              <div className=" col-md-10 offset-md-1 col-lg-12 offset-lg-0 align-items-center">
                <div className="sidebar">
                  <div className="widget user-dashboard-profile d-flex justify-content-between align-items-center col-12 bg-transparent text-center">
                    {/* <!-- User Image --> */}
                    <Link to="/dashboard">
                      <div className="profile-thumb ">
                        <img
                          src={mAnonymous}
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </Link>

                    <div className="align-items-center text-center">
                      {/* <!-- User Name --> */}

                      <small>...You are chatting with </small>
                      <br />
                      <h5 className="text-center">
                        {capitalise(newfriend.username)}
                      </h5>

                      {/* <br /> */}
                      <div
                        // to={'/deletefriend/' + newfriend.email}
                        className="btn btn-main-sm bg-transparent text-danger"
                        id="disc"
                        onClick={Disconnect}
                      >
                        {talk}
                      </div>
                    </div>
                    <div class="searchmygee">
                      <div class="advance-search ">
                        <form>
                          <div class="form-row ">
                            <div class="form-group col-md-9 ">
                              <input
                                type="text"
                                class="form-control text-dark bg-light"
                                id="inputLocation4"
                                placeholder="Search Anonymous"
                                onChange={Search}
                              />
                            </div>
                            <div class="form-group col-md-1">
                              <button
                                type="submit"
                                class="btn btn-warning"
                                onClick={Searchsubmit}
                              >
                                Find
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 offset-md-1 col-lg-12 offset-lg-0">
                <div className="pd-ltr-20 xs-pd-20-10">
                  <div className="min-height-100px">
                    <div className="bg-white border-radius-4 box-shadow ">
                      <div className="row no-gutters">
                        <div className="col-lg-12 col-md-12 col-sm-12 overflow-auto">
                          <div className="chat-detail">
                            <div className="chat-profile-header clearfix">
                              <div className="left">
                                <div className="clearfix bg-transparent">
                                  <div className="chat-profile-photo">
                                    <img
                                      src={mAnonymous}
                                      alt=""
                                      className="rounded-circle"
                                    />
                                  </div>
                                  <div className="chat-profile-name">
                                    <h3 style={{color:newfriend.online?"green":"gray"}}>{capitalise(newfriend.username)}</h3>
                                    <span>
                                      Last seen <br />
                                      {newfriend.lastlogin}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* debug from here below */}

                              <div className="right text-right">
                                <div
                                  to={'/clearchat/' + newfriend.email}
                                  className="btn btn-main-sm bg-warning"
                                  onClick={ClearChat}
                                >
                                  {sure}
                                </div>
                              </div>
                            </div>
                            {/* below is fine */}
                            <div className="chat-box ">
                              <div className="chat-desc ">
                                <ul
                                  className="specialeffect "
                                  id="scrohld"
                                  onLoad={Scrold}
                                >
                                  {cmessages.map((item, index) => {
                                    if (item.from === user.email)
                                      return (
                                        <li
                                          className="clearfix text-right"
                                          key={index}
                                        >
                                          <div>
                                            <span className="chat-img">
                                              <img src={mAnonymous} alt="" />
                                            </span>
                                            <div className="chat-body clearfix">
                                              <p>{item.message}</p>

                                              {/* <p>hi im here</p> */}

                                              <div className="chat_time">
                                                {item.time}
                                                {/* 22:45 */}
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    else
                                      return (
                                        <li
                                          className=""
                                          // key={index}
                                        >
                                          <div>
                                            <span className="chat-img">
                                              <img src={mAnonymous} alt="" />
                                            </span>
                                            <div className="chat-body clearfix">
                                              <p>{item.message}</p>
                                              {/* <p>hi im here</p> */}

                                              <div className="chat_time">
                                                {item.time}
                                                {/* 22:45 */}
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                  })}
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 chat-footer typp">
                              <div className="file-upload">
                                <Link to="">
                                  <i className="fa fa-paperclip"></i>
                                </Link>
                              </div>
                              <div className="chat_text_area">
                                <textarea
                                  placeholder="Type your message…"
                                  className="text-center txtt"
                                  onChange={Gettyped}
                                  value={typed}
                                  style={{ fontSize: '20px' }}
                                  id="foch"
                                ></textarea>
                              </div>
                              <div className="chat_send">
                                <button
                                  className="btn btn-link"
                                  onClick={SendMesaage}
                                >
                                  <i class="fa fa-paper-plane"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* chat starts below */}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    console.log('this is ifmessages ' + ifmessages);

    return (
      <div>
        <section className="dashboard  section mt-0">
          <div className="container">
            <div class="row makefixed">
              <div className=" col-md-12 offset-md-1 col-lg-12 offset-lg-0 align-items-center">
                <div className="sidebar">
                  <div className="widget user-dashboard-profile d-flex justify-content-between align-items-center col-12 bg-transparent">
                    {/* <!-- User Image --> */}
                    <Link to="/dashboard">
                      <div className="profile-thumb ">
                        <img
                          src={mAnonymous}
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </Link>

                    <div>
                      {/* <!-- User Name --> */}

                      <small>...You are chatting with </small>
                      <h5 className="text-center">
                        {capitalise(newfriend.username)}
                      </h5>

                      <br />
                      <div
                        // to={'/deletefriend/' + newfriend.email}
                        className="btn btn-main-sm bg-transparent text-danger"
                        id="disc"
                        onClick={Disconnect}
                      >
                        {talk}
                      </div>
                    </div>
                    <div class="searchmygee">
                      <div class="advance-search ">
                        <form>
                          <div class="form-row ">
                            <div class="form-group col-md-9 ">
                              <input
                                type="text"
                                class="form-control text-dark bg-light"
                                id="inputLocation4"
                                placeholder="Search Anonymous"
                                onChange={Search}
                              />
                            </div>
                            <div class="form-group col-md-1">
                              <button
                                type="submit"
                                class="btn btn-warning"
                                onClick={Searchsubmit}
                              >
                                Find
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Row Start --> */}
            <div className="row">
              <div className="col-md-12 offset-md-1 col-lg-12 offset-lg-0">
                <div className="pd-ltr-20 xs-pd-20-10">
                  <div className="min-height-200px ">
                    <div className="bg-white border-radius-4 box-shadow mb-30">
                      <div className="row no-gutters">
                        <div className="col-lg-12 col-md-8 col-sm-12 overflow-auto">
                          <div
                            className="chat-detail "
                            style={{ height: '30vh' }}
                          >
                            <div className="chat-profile-header clearfix">
                              <div className="left">
                                <div className="clearfix">
                                  <div className="chat-profile-photo">
                                    <img
                                      src={Anonymous}
                                      alt=""
                                      className="rounded-circle"
                                    />
                                  </div>
                                  <div className="chat-profile-name">
                                    <h3>{newfriend.username}</h3>
                                    <span>{newfriend.anonymous}</span>
                                  </div>
                                </div>
                              </div>
                              {/* debug from here below */}
                            </div>
                            {/* below is fine */}
                            <div className="chat-box">
                              <div className="chat-desc  ">
                                <ul>
                                  {/* <li className="clearfix admin_chat">
                                    <span className="chat-img">
                                      <img src={Anonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        Maybe you already have additional info?
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix admin_chat">
                                    <span className="chat-img">
                                      <img
                                        src={Anonymous}
                                        alt=""
                                        className="rounded-circle"
                                      />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        It is to early to provide some kind of
                                        estimation here. We need user stories.
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li> */}

                                  <li className="clearfix">
                                    <span className="chat-img">
                                      <img src={mAnonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p className="text-center">
                                        no messages yet
                                      </p>
                                      <div className="chat_time text-center">
                                        start chat below
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* chat starts below */}
              <div className="col-lg-9 col-sm-10 chat-footer typp">
                <div className="file-upload">
                  <Link to="">
                    <i className="fa fa-paperclip"></i>
                  </Link>
                </div>
                <div className="chat_text_area">
                  <textarea
                    placeholder="Type your message…"
                    className="text-center capitalisation"
                    onChange={Gettyped}
                  ></textarea>
                </div>
                <div className="chat_send">
                  <button className="btn btn-link" onClick={SendMesaage}>
                    <i class="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Chat;
