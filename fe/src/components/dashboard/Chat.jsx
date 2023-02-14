import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import Anonymous from '../../anonymous.png';
import './Chat.css';
import mAnonymous from '../../main_anonymous.png';

const Chat = ({
  user,
  setUser,
  friends,
  setFRiends,
  currentChat,
  setCurrentChat,
  newfriend,
  setNewfriend,
  messages,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typed, setTyped] = useState('');

  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const Gettyped = (e) => {
    e.preventDefault();
    setTyped(e.target.value);
  };
  console.log(
    'yes ' + currentChat + ' is currently on chat with ' + user.email
  );
  const SendMesaage = (e) => {
    e.preventDefault();
    const timee =
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    axios
      .post('/sendmessage', { newmessage: typed, rexemail: currentChat, timee:timee })
      // .then((res) => {
      //   if (res.data.signupfeedBack.success) {
      //     setUser(res.data.signupfeedBack.user);
      //     setNewfriend(res.data.signupfeedBack.newFriend);
      //     console.log('ok ' + res.data.signupfeedBack.newFriend.username);

          
      //   } else {
      //     swal({
      //       title: 'Error !',
      //       text: 'Sorry this chat code is invalid',
      //       icon: 'error',
      //       button: 'Ok!',
      //     });
      //   }
      // });
  };
  const Searchsubmit = (e) => {
    e.preventDefault();

    axios.post('/search', { search: search }).then((res) => {
      if (res.data.signupfeedBack.success) {
        setUser(res.data.signupfeedBack.user);
        setNewfriend(res.data.signupfeedBack.newFriend);
        console.log('ok ' + res.data.signupfeedBack.newFriend.username);

        navigate('/chat');
        // alert(res.data.signupfeedBack.message);
      } else {
        swal({
          title: 'Error !',
          text: 'Sorry this chat code is invalid',
          icon: 'error',
          button: 'Ok!',
        });
      }
    });
  };
  function capitalise(x) {
    var b = x.charAt(0).toUpperCase() + x.slice(1);
    return b;
  }

  if (newfriend.rmessages) {
    return (
      <div>
        <section className="dashboard  section mt-0">
          <div className="container">
            <div class="row makefixed">
              <div className=" col-md-10 offset-md-1 col-lg-12 offset-lg-0 align-items-center">
                <div className="sidebar">
                  {/* <!-- User Widget --> */}
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

                      <h5 className="text-center">
                        {capitalise(newfriend.username)}
                      </h5>
                      <small>
                        Last seen <br />
                        {newfriend.lastlogin}
                      </small>
                      <br />
                      <Link
                        to={'/deletefriend/' + newfriend.email}
                        className="btn btn-main-sm bg-light text-success"
                      >
                        Clear History
                      </Link>
                    </div>
                    <div class="searchmygee">
                      <div class="advance-search ">
                        <form>
                          <div class="form-row bg-light">
                            <div class="form-group col-md-9 ">
                              <input
                                type="text"
                                class="form-control text-dark"
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
              <div className="col-md-10 offset-md-1 col-lg-12 offset-lg-0">
                <div className="pd-ltr-20 xs-pd-20-10">
                  <div className="min-height-200px">
                    <div className="bg-white border-radius-4 box-shadow mb-30">
                      <div className="row no-gutters">
                        <div className="col-lg-12 col-md-8 col-sm-12 overflow-auto">
                          <div className="chat-detail">
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
                                    <h3>{capitalise(newfriend.username)}</h3>
                                    <span>{newfriend.anonymous}</span>
                                  </div>
                                </div>
                              </div>
                              {/* debug from here below */}

                              <div className="right text-right">
                                <Link
                                  to={'/clearchat/' + newfriend.email}
                                  className="btn btn-main-sm bg-warning"
                                >
                                  Clear chat
                                </Link>
                              </div>
                            </div>
                            {/* below is fine */}
                            <div className="chat-box">
                              <div className="chat-desc customscroll ">
                                <ul>
                                  <li className="clearfix admin_chat">
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
                                  </li>
                                  <li className="clearfix">
                                    <span className="chat-img">
                                      <img src={mAnonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        We are just writing up the user stories
                                        now so will have requirements for you
                                        next week. We are just writing up the
                                        user stories now so will have
                                        requirements for you next week.
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix">
                                    <span className="chat-img">
                                      <img src={mAnonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        Essentially the brief is for you guys to
                                        build an iOS and android app. We will do
                                        backend and web app. We have a version
                                        one mockup of the UI, please see it
                                        attached. As mentioned before, we would
                                        simply hand you all the assets for the
                                        UI and you guys code. If you have any
                                        early questions please do send them on
                                        to myself. Ill be in touch in coming
                                        days when we have requirements prepared.
                                        Essentially the brief is for you guys to
                                        build an iOS and android app. We will do
                                        backend and web app. We have a version
                                        one mockup of the UI, please see it
                                        attached. As mentioned before, we would
                                        simply hand you all the assets for the
                                        UI and you guys code. If you have any
                                        early questions please do send them on
                                        to myself. Ill be in touch in coming
                                        days when we have.
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix admin_chat">
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
                                      <img src={Anonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        It is to early to provide some kind of
                                        estimation here. We need user stories.
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix">
                                    <span className="chat-img">
                                      <img src={mAnonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        We are just writing up the user stories
                                        now so will have requirements for you
                                        next week. We are just writing up the
                                        user stories now so will have
                                        requirements for you next week.
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix">
                                    <span className="chat-img">
                                      <img src={mAnonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <p>
                                        Essentially the brief is for you guys to
                                        build an iOS and android app. We will do
                                        backend and web app. We have a version
                                        one mockup of the UI, please see it
                                        attached. As mentioned before, we would
                                        simply hand you all the assets for the
                                        UI and you guys code. If you have any
                                        early questions please do send them on
                                        to myself. Ill be in touch in coming
                                        days when we have requirements prepared.
                                        Essentially the brief is for you guys to
                                        build an iOS and android app. We will do
                                        backend and web app. We have a version
                                        one mockup of the UI, please see it
                                        attached. As mentioned before, we would
                                        simply hand you all the assets for the
                                        UI and you guys code. If you have any
                                        early questions please do send them on
                                        to myself. Ill be in touch in coming
                                        days when we have.
                                      </p>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix upload-file">
                                    <span className="chat-img">
                                      <img src={mAnonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <div className="upload-file-box clearfix">
                                        <div className="left">
                                          <img
                                            src="vendors/images/upload-file-img.jpg"
                                            alt=""
                                          />
                                          <div className="overlay">
                                            <Link to="">
                                              <span>
                                                <i className="fa fa-angle-down"></i>
                                              </span>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="right">
                                          <h3>Big room.jpg</h3>
                                          <Link to="">Download</Link>
                                        </div>
                                      </div>
                                      <div className="chat_time">09:40PM</div>
                                    </div>
                                  </li>
                                  <li className="clearfix upload-file admin_chat">
                                    <span className="chat-img">
                                      <img src={Anonymous} alt="" />
                                    </span>
                                    <div className="chat-body clearfix">
                                      <div className="upload-file-box clearfix">
                                        <div className="left">
                                          <img
                                            src="vendors/images/upload-file-img.jpg"
                                            alt=""
                                          />
                                          <div className="overlay">
                                            <Link to="">
                                              <span>
                                                <i className="fa fa-angle-down"></i>
                                              </span>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="right">
                                          <h3>Big room.jpg</h3>
                                          <Link to="">Download</Link>
                                        </div>
                                      </div>
                                      <div className="chat_time">09:40PM</div>
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
                  ></textarea>
                </div>
                <div className="chat_send">
                  <button className="btn btn-link" type="submit">
                    <i class="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <section className="dashboard  section mt-0">
          <div className="container">
            <div class="row makefixed">
              <div className=" col-md-10 offset-md-1 col-lg-12 offset-lg-0 align-items-center">
                <div className="sidebar">
                  {/* <!-- User Widget --> */}
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

                      <h5 className="text-center">
                        {capitalise(newfriend.username)}
                      </h5>
                      <small>
                        Last seen <br />
                        {newfriend.lastlogin}
                      </small>
                      <br />
                      <Link
                        to={'/deletefriend/' + newfriend.email}
                        className="btn btn-main-sm bg-light text-success"
                      >
                        Clear History
                      </Link>
                    </div>
                    <div class="searchmygee">
                      <div class="advance-search ">
                        <form>
                          <div class="form-row bg-light">
                            <div class="form-group col-md-9 ">
                              <input
                                type="text"
                                class="form-control text-dark"
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
              <div className="col-md-10 offset-md-1 col-lg-12 offset-lg-0">
                <div className="pd-ltr-20 xs-pd-20-10">
                  <div className="min-height-200px">
                    <div className="bg-white border-radius-4 box-shadow mb-30">
                      <div className="row no-gutters">
                        <div className="col-lg-12 col-md-8 col-sm-12 overflow-auto">
                          <div className="chat-detail">
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
                                    <h3>{capitalise(newfriend.username)}</h3>
                                    <span>{newfriend.anonymous}</span>
                                  </div>
                                </div>
                              </div>
                              {/* debug from here below */}

                              <div className="right text-right">
                                <Link
                                  to={'/clearchat/' + newfriend.email}
                                  className="btn btn-main-sm bg-warning"
                                >
                                  Clear chat
                                </Link>
                              </div>
                            </div>
                            {/* below is fine */}
                            <div className="chat-box">
                              <div className="chat-desc customscroll ">
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
