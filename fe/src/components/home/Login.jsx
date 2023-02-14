import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Anonyhead from '../dashboard/Anonyhead';

const Login = ({ user, setUser }) => {
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
      };
      axios
        .post('/login', {
          login: objectlog,
        })
        .then((res) => {
          if (res.data.signupfeedBack.success) {
            setUser(res.data.signupfeedBack.user);
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
      <section className="fixo">
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

      <section className="hero-area bg-1 text-center overlay">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="content-block cele col-7 mx-auto">
                {/* <form action="/login" method="post"> */}
                <input
                  type="text"
                  name="username"
                  id=""
                  className="text-center rounded-pill"
                  placeholder="username or Email"
                  onChange={Onchangeu}
                />

                <input
                  type="password"
                  name="pwrd"
                  id=""
                  className="text-center rounded-pill"
                  onChange={Onchangep}
                  placeholder="enter password"
                />

                <button
                  className="navbar-toggler"
                  type="submit"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={Submit}
                >
                  <span className="">login</span>
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
