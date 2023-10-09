import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

import 'swiper/css';
// import Anonymous from '../../anonymous.png';

import mAnonymous from '../../main_anonymous.png';
import './dbd.css';

import io from 'socket.io-client';

const ENDPOINT = 'https://localhost:3001'; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket





const Dashboard = ({
  user,
  setUser,
  friends,
  setFriends,
  currentChat,
  setCurrentChat,
  newfriend,
  setMessages,
  setNewfriend,
  ifmessages,
  setIfmessages,
  // socket,
}) => {
  function capitalise(x) {
    var b = x.charAt(0).toUpperCase() + x.slice(1);
    return b;
  }
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [profilee, setProfilee] = useState(false);
  const [hprofile, setHprofile] = useState('View profile !');

  const [search, setSearch] = useState('');
  const [idd, setIdd] = useState('kk');

  const Hideprofile = (e) => {
    if (hprofile === 'View profile !') {
      setHprofile('Hide profile');
      setProfilee(!profilee);
    } else {
      setHprofile('View profile !');
      setProfilee(!profilee);
    }
  };

  const Gotochat = (emails) => {
    // e.preventDefault()
    // const sayid = e.target.()
    setIdd(emails);
    // console.log(emails + ' is id');
    if (idd) {
      axios.post('/meet', { emails: emails }).then((res) => {
        if (res.data.signupfeedBack.success) {
          setUser(res.data.signupfeedBack.user);
          setNewfriend(res.data.signupfeedBack.newFriend);
          setCurrentChat(res.data.signupfeedBack.newFriend.email);
          setIfmessages(res.data.signupfeedBack.message);
          setFriends(res.data.signupfeedBack.allfriends);
          setMessages(res.data.signupfeedBack.rmessages);
          
          socket = io(ENDPOINT);
          console.log(socket)
          socket.emit('connection', res.data.signupfeedBack.newFriend);
          
          navigate('/chat');

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
            text: res.data.signupfeedBack.message,
            icon: 'error',
            button: 'Ok!',
          });
          setUser(res.data.signupfeedBack.user);
        }
      });
    }
  };

  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const Searchsubmit = (e) => {
    e.preventDefault();

    if (search !== '') {
      axios.post('/search', { search: search }).then((res) => {
        if (res.data.signupfeedBack.success) {
          setUser(res.data.signupfeedBack.user);
          setNewfriend(res.data.signupfeedBack.newFriend);
          setCurrentChat(res.data.signupfeedBack.newFriend.email);
          setIfmessages(res.data.signupfeedBack.message);
          setFriends(res.data.signupfeedBack.allfriends);

          navigate('/chat');

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
            text: res.data.signupfeedBack.message,
            icon: 'error',
            button: 'Ok!',
          });
          setUser(res.data.signupfeedBack.user);
        }
      });
    } else {
      swal({
        title: 'Input is empty !',
        text: 'Enter anonymous pin',
        icon: 'error',
        button: 'Ok!',
      });
    }
  };
  const Getano = (e) => {
    e.preventDefault();
    // console.log("blurred")
    axios.get('/getan').then((res) => {
      if (res.data.signupfeedBack.success) {
        setUser(res.data.signupfeedBack.user);
        const tobecopied = res.data.signupfeedBack.user.anonymous;
        navigator.clipboard.writeText(tobecopied);
        console.log(tobecopied + ' is copied to clipboard');
        setIsShown((current) => true)
        const timeout = setTimeout(() => {
          setIsShown((current) => false);
        }, 2000);
        timeout()
      } else if (res.data.signupfeedBack.message === 'expired') {
        setUser({});
        swal({
          title: 'Error !',
          text: 'Auth expired. Please login and try again',
          icon: 'error',
          button: 'Ok!',
        });

        navigate('/');
      }
    });
  };
  if (friends) {
    return (
      <div className="bg-transparent">
        <br />
        <div className="fdash">
          <Link className="navbar-brand" to="/editprofile">
            <img src={mAnonymous} className="ligo" alt="" />
          </Link>
          <Link className="navbar-brand" to="/">
            <h1 className="text-center corn ann">Anonymous</h1>
          </Link>
        </div>
        <br />
        <div className="col-lg-3 col-10 slash text-center">
          {/* <div className=" col-4  col-md-5 "> */}
          <input
            type="text"
            className="rounded  form-control text-center text-light choppinnput"
            id="inputLocation4"
            placeholder="paste connection pin"
            onChange={Search}
          />
          &nbsp;
          <button type="submit" className="btn chopp" onClick={Searchsubmit}>
            Find
          </button>
          
        </div>

        <br />
        <div className="relative">
          <h2 className="text-center corne" onClick={Getano}>
            Hi {capitalise(user.username)}
          </h2>
          <h2
            style={{ display: isShown ? 'block' : 'none' }}
            className="ml-5 popin text-success text-center"
          >
            copied to clipboard
          </h2>
        </div>
        <div className="row ">
          <div className="container-fluid text-center ">
            <div className="col-12">
              <div className=" text-center">
                <div className="father">
                  <div className="firstc ">
                    <div>
                      <img src={mAnonymous} alt="" className="ligo mx-auto" />
                    </div>
                    <div className="buttons">
                      <div className="sbody">
                        <button
                          class="glow-on-hover"
                          type="button"
                          onClick={Hideprofile}
                        >
                          {hprofile}
                        </button>
                        <button
                          type="button"
                          class="glow-on-hover"
                          style={{ display: profilee ? 'block' : 'none' }}
                        >
                          <Link to="/editprofile">
                            <span className="corne">Edit Profile</span>
                          </Link>
                        </button>
                      </div>
                    </div>
                    <div
                      className="profile pl-2 "
                      style={{ display: profilee ? 'block' : 'none' }}
                    >
                      {/* <span>Profile</span> */}

                      <table>
                        <tr className="corne">
                          Avatar
                        </tr>
                        <tr className="corne">
                          <td className="">Username &nbsp;</td>
                          <td className="corne">{capitalise(user.username)}</td>
                        </tr>

                        <tr className="corne">
                          <td className="">Registered: &nbsp;</td>
                          <td className="corne">{user.regDate}</td>
                        </tr>
                        <tr
                          className="corne"
                          // style={{ display: user.lastseen ? 'block' : 'none' }}
                        >
                          <td className="">Last Seen: &nbsp;</td>
                          <td className="corne">{user.lastseen}</td>
                        </tr>
                        <tr className="corne">
                          <td className="">Last Login &nbsp;</td>
                          <td className="corne">{user.lastlogin}</td>
                        </tr>
                        <tr className="corne">
                          <td className="">Prescence &nbsp;</td>
                          <td className="corne">{user.logintimes}</td>
                        </tr>
                        <tr className="corne">
                          <td className="">Friends </td>
                          <td className="corne">{friends.length}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="mother align-items-center justify-content-center col-12">
                    <div className="dashh ">
                      <div>
                        <table class="container  text-center">
                          {/* <thead> */}
                          <tr>
                            <th className="text-center lm">
                              <h1 className="text-center">Avatar</h1>
                            </th>
                            <th>
                              <h1 className="text-center bua">Anonymous</h1>
                            </th>
                            <th>
                              <h1 className="text-center bua">Last messages</h1>
                            </th>
                            <th className="tmm">
                              <h1
                                className="text-center bua"
                                title="total received messages"
                              >
                                Rx messages
                              </h1>
                            </th>
                            <th className="tmm">
                              <h1
                                className="text-center bua"
                                title="total sent messages"
                              >
                                Tx messages
                              </h1>
                            </th>
                          </tr>
                          {/* </thead> */}
                          <tbody className=" setflow">
                            {friends.map((item, index) => (
                              <tr key={index}>
                                <td className=" lm">
                                  <img
                                    
                                    src={mAnonymous}
                                    alt="imagedescription"
                                  />
                                </td>
                                <td className="product-details">
                                  <div className="">
                                    <h3
                                      className="title corn"
                                      emails={item.femail}
                                      onClick={() => Gotochat(item.femail)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {capitalise(item.fusername)}
                                    </h3>
                                  </div>
                                </td>
                                <td className="product-category ">
                                  <span className="categories">
                                    {item.lastmessage}
                                  </span>
                                </td>
                                <td className="action tmm" data-title="Action">
                                  <div className="">
                                    <ul className="list-inline justify-content-center">
                                      <li className="list-inline-item">
                                        <span className="categories corn">
                                          {item.recmessages}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                                <td className="action tmm" data-title="Action">
                                  <div className="">
                                    <ul className="list-inline justify-content-center">
                                      <li className="list-inline-item">
                                        <span className="categories corn">
                                          {item.sentmessages}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <section className="fixob">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg navigation d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <Link className="navbar-brand" to="/editprofile">
                      <img src={mAnonymous} className="ligo" alt="" />
                    </Link>
                    <Link className="navbar-brand" to="/">
                      <h1 className="text-center">Anonymous</h1>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <div className="profile-thumb dfl">
          {/* <div className="col-6"> */}
          <div className="advance-search mt-2 col-9 col-lg-5 col-md-7 ">
            <form>
              <div className="form-row d-flex justify-content-center align-items-center">
                <div className="form-group col-7 col-md-9 ">
                  <input
                    type="text"
                    className="form-control text-center text-light"
                    id="inputLocation4"
                    placeholder="Paste pin"
                    onChange={Search}
                  />
                </div>
                <div className="form-group col-4 col-md-1 ">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={Searchsubmit}
                  >
                    Find
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
        {/* <!--==================================
=            User Profile            =
===================================--> */}
        <section className="dashboard section text-center">
          {/* <!-- Container Start --> */}
          <div className="container">
            {/* <!-- Row Start --> */}
            <div className="row">
              <div className="col-md-10 offset-md-1 col-lg-12 offset-lg-0">
                <h2 className="text-center text-light text-capitalize">{user.username}</h2>
                <h2
                  style={{ display: isShown ? 'block' : 'none' }}
                  className="popin ml-2"
                >
                  copied to clipboard
                </h2>

                <div className="widget col-12 col-lg-12 col-md-12 dashboard-container my-adslist text-center">
                  {/* <sub>copy userpin</sub> */}

                  <del className="widget-header text-center text-info" onClick={Getano}>
                    {user.anonymous + 'u'}
                  </del>
                  <small className="text-center text-light">
                    Your chat logs are empty{''}
                  </small>
                  <br />
                  <small className="text-center text-warning">
                    search anonymous to start a chat
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Dashboard;
