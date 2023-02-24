import { Link} from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Anonyhead from '../dashboard/Anonyhead';


const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInput] = useState({
    username: '',
    pwrd: '',
    email: '',
    cpwrd: '',
    birth: '',
  });

  const HandleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };
  function Signupp(e) {
    e.preventDefault();
    console.log('submit clicked ' + inputs.pwrd);
    if (inputs.pwrd && inputs.cpwrd === inputs.pwrd) {
      const pwrd = document.getElementById('pwrd');
      const cpwrd = document.getElementById('cpwrd');
      pwrd.style.border = '1px solid green';
      cpwrd.style.border = '1px solid green';
      const sObject = {
        username: inputs.username,
        email: inputs.email,
        pwrd: inputs.pwrd,
        birth: inputs.birth,
        cpwrd: inputs.cpwrd,
      };

      axios({
        method: 'post',
        url: '/signup',
        data: sObject,
      }).then((res) => {
        if (res.data.signupfeedBack.success) {
          swal(
            'Verify acount!',
            '...check your email for verification mail !!'
          );
          // setSignObj(res.data.signupfeedBack.object);
          // console.log(signobj + " is object");

          navigate('/verifymail');
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
      const pwrd = document.getElementById('pwrd');
      const cpwrd = document.getElementById('cpwrd');
      pwrd.style.border = '2px solid red';
      cpwrd.style.border = '2px solid red';
    }
  }

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
                <div className="">
                  <Link className=" login-button" to="/loginpage">
                    Login
                  </Link>
                </div>
                <div className="sinup">
                  <Link className=" add-button" to="/signuppage">
                    <i className="fa fa-pencil"></i> Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-area  text-center ovenrlay">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="content-block text-center col-7 cele mx-auto">
                {/* <form action="/signup" method="post"> */}
                <input
                  type="text"
                  name="username"
                  id="graa"
                  placeholder="Username"
                  className="text-center rounded-pill"
                  onChange={HandleChange}
                />

                <input
                  type="email"
                  name="email"
                  className="text-center rounded-pill"
                  id="graa"
                  placeholder="email"
                  onChange={HandleChange}
                />
                <div className=" bola">
                  <input
                    type="password"
                    name="pwrd"
                    id="pwrd"
                    placeholder="enter password"
                    className="text-center rounded-pill"
                    onChange={HandleChange}
                  />

                  <input
                    type="password"
                    name="cpwrd"
                    id="cpwrd"
                    placeholder="confirm password"
                    className="text-center rounded-pill"
                    onChange={HandleChange}
                  />
                </div>

                {/* <label htmlFor="date" className='text-center'>Date of Birth</label> */}

                <input
                  type="date"
                  name="birth"
                  id="date"
                  placeholder="Date of birth"
                  className="text-center"
                  onChange={HandleChange}
                />
                <br />
                <br />
                <button
                  className="navbar-toggler corn"
                  type="submit"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={Signupp}
                >
                  <span className="">signup</span>
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

export default Signup;
