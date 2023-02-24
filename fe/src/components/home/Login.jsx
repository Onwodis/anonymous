import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Anonyhead from '../dashboard/Anonyhead';
import socketIOClient from 'socket.io-client';

// import ParticlesBg from 'particles-bg';
// import ParticleEffectButton from 'react-particle-effect-button';

const Login = ({ user, setUser, friends, setFriends, socket }) => {
  function capitalise(x) {
    var b = x.charAt(0).toUpperCase() + x.slice(1);
    return b;
  }
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [pwrd, setPwrd] = useState('');

  const Onchangep = (e) => {
    e.preventDefault();
    setPwrd(e.target.value);
  };
  const Onchangeu = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const Submit = (ev) => {
    ev.preventDefault();
    if (username !== '' && username !== ' ' && pwrd !== '' && pwrd !== ' ') {
      const objectlog = {
        username: username,
        password: pwrd,
        socketid: socket.id,
      };
      axios
        .post('/login', {
          login: objectlog,
        })
        .then((res) => {
          if (res.data.signupfeedBack.success) {
            setUser(res.data.signupfeedBack.user);
            setFriends(res.data.signupfeedBack.allfriends);
            // const email= res.data.signupfeedBack.user.email;
            const username =
              res.data.signupfeedBack.user.username.toLowerCase();

            socket.emit('add_user', objectlog);
            console.log('my socket id is ' + socket.id);

            swal(
              'Welcome ' + capitalise(res.data.signupfeedBack.user.username),
              '...Do not forget to invite your friends !!'
            );

            navigate('/dashboard');
          } else {
            swal({
              title: 'Error !',
              text: res.data.signupfeedBack.message,
              icon: 'error',
              button: 'Ok!',
            });
          }
        });
    } else {
      swal({
        title: 'Error !',
        text: 'Sorry you can not submit empty field(s)',
        icon: 'error',
        button: 'Ok!',
      });
    }
  };

  return (
    <div>
      <section className="fixo col-11">
        <div className="container">
          <div className="row">
            <div className=" bore">
              <div className="">
                <Anonyhead />
              </div>

              <div className=" sora">
                <div className="sinup">
                  <Link className=" login-button" to="/">
                    Home
                  </Link>
                </div>
                <div className="">
                  <Link className=" add-button" to="/signuppage">
                    <i className="fa fa-pencil"></i> Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-area bg text-center overhlay">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="content-block text-center cele col-7 mx-auto align-items-center">
                {/* <form action="/login" method="post"> */}
                <input
                  type="text"
                  name="username"
                  id="graa"
                  className="text-center rounded-pill"
                  placeholder="username or Email"
                  onChange={Onchangeu}
                />

                <input
                  type="password"
                  name="pwrd"
                  id="graa"
                  className="text-center rounded-pill"
                  onChange={Onchangep}
                  placeholder="enter password"
                />

                <button
                  className="navbar-toggler corn mx-auto"
                  type="submit"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={Submit}
                >
                  <br />
                  <span className="corn text-center">login</span>
                </button>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
