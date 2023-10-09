import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';
import mAnonymous from '../../main_anonymous.png';


const Verifymail = () => {
  const navigate = useNavigate();

    const [codee,setCodee]= useState("")
    const Getvalue = (ev)=>{
      ev.preventDefault();
      const newg = ev.target.value;
      setCodee(newg)

    }
    const Verify = (e) => {
      e.preventDefault();

        console.log("this is code to be sent " + codee)
        axios
          .post('/savesignup', {
            codee: codee
          })
          // axios({
          //     method: 'post',
          //     url: '/savesignup',
          //     data: codee,
          //   })
          .then((res) => {
            if (res.data.signupfeedBack.success) {
              swal({
                title: 'Sign up Successful !',
                text: 'Your account has been created successfully.',
                icon: 'success',
                button: 'Ok!',
              });

              navigate('/loginpage');
            } else {
              swal({
                title: 'Error !',
                text: res.data.signupfeedBack.message,
                icon: 'error',
                button: 'Ok!',
              });
              // navigate('/signuppage');

            }
          });
     
    };
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg  navigation">
                <Link to='/'>
                  <img src={mAnonymous} className='w-100' id="logon" alt="" />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto mt-10">
                    <li className="nav-item">
                      <Link className="nav-link login-button" to="/">
                        <i className="fa fa-home"></i> &nbsp; Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link add-button" to="/loginpage">
                        <i className="fa fa-sign-in"></i>
                        &nbsp; login
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-area bg-1 text-center overly">
        <div className="container items-center mx-auto">
          <div className="row items-center ">
            <div className="col-md-12 text-center ">
              <div className="content-block bab mx-auto border-danger">
                <form action="/savesignup" method="post">
                  <input autoFocus
                    type="text"
                    name="vmail"
                    id="jk"
                    className='text-center'
                    placeholder="enter verification code"
                    value={codee}
                    onChange={Getvalue}
                  />
                  <br />
                  <br />
                  <button
                    className="navbar-toggler text-success active outline-warning"
                    type="submit"
                    onClick={Verify}
                  >
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verifymail