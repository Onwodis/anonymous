import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mAnonymous from '../../main_anonymous.png';
// import Anonyhead from './Anonyhead';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [newUsername, setUsername] = useState(user.username);
  const [cpwrd, setCpwrd] = useState('');
  const [pwrd, setPwrd] = useState('');
  const [oldpwrd, setOldpwrd] = useState('');

  function capitalise(x) {
    var b = x.charAt(0).toUpperCase() + x.slice(1);
    return b;
  }
  const DeleteAccount = (e) => {
    e.preventDefault();
    axios.get(`/deleteaccount`).then((res) => {
      if (res.data.signupfeedBack.success) {
        setUser({});
        swal('Account deleted successfully  !!');

        navigate('/');
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
      else {
        swal({
          title: 'Error !',
          text: "Sorry you can't do this now",
          icon: 'error',
          button: 'Ok!',
        });
      }
    });
  };
  const Onchangeo = (e) => {
    e.preventDefault();
    setOldpwrd(e.target.value);
  };
  const Onchangen = (e) => {
    e.preventDefault();
    setPwrd(e.target.value);
  };
  const Onchangec = (e) => {
    e.preventDefault();
    setCpwrd(e.target.value);
  };
  const Changeusername = (e) => {
    e.preventDefault();

    setUsername(e.target.value);
  };
  const Updateusername = (e) => {
    e.preventDefault();
    if (newUsername !== user.username) {
      axios.post(`/updateusername`, { newUsername }).then((res) => {
        if (res.data.signupfeedBack.success) {
          setUser(res.data.signupfeedBack.user);
          swal('Username has been updated successfully  !!');
        } else if (res.data.signupfeedBack.message === 'expired') {
          setUser({});
          swal({
            title: 'Error !',
            text: 'Auth expired. Please login and try again',
            icon: 'error',
            button: 'Ok!',
          });

          navigate('/');
        } else {
          swal({
            title: 'Error !',
            text: res.data.signupfeedBack.message,
            icon: 'error',
            button: 'Ok!',
          });
          setUsername(user.username);
        }
      });
    }
  };
  const Changepwrd = (e) => {
    e.preventDefault();
    if (cpwrd === pwrd && (pwrd && oldpwrd) !== '' && pwrd.length > 5) {
      const pwrds = {
        oldpwrd: oldpwrd,
        cpwrd: cpwrd,
        pwrd: pwrd,
      };
      console.log('im inside axios');
      axios.post(`/changepassword`, { pwrds }).then((res) => {
        if (res.data.signupfeedBack.success) {
          setUser(res.data.signupfeedBack.user);
          const inputn = document.getElementById('new-password');
          const inputo = document.getElementById('current-password');
          const inputc = document.getElementById('confirm-password');
          inputn.style.border = '0';
          inputo.style.border = '0';
          inputc.style.border = '0';
          inputn.vaue = '';
          inputo.vaue = '';
          inputc.vaue = '';
          swal('Password has been updated successfully  !!');
        } else if (res.data.signupfeedBack.message === 'expired') {
          setUser({});
          swal({
            title: 'Error !',
            text: 'Auth expired. Please login and try again',
            icon: 'error',
            button: 'Ok!',
          });

          navigate('/');
        } else {
          swal({
            title: 'Error !',
            text: res.data.signupfeedBack.message,
            icon: 'error',
            button: 'Ok!',
          });
          const inputn = document.getElementById('new-password');
          const inputo = document.getElementById('current-password');
          const inputc = document.getElementById('confirm-password');
          inputn.style.border = '2px solid red';
          inputo.style.border = '2px solid red';
          inputc.style.border = '2px solid red';
        }
      });
    } else {
      const inputn = document.getElementById('new-password'); 
      const inputo = document.getElementById('current-password'); 
      const inputc = document.getElementById('confirm-password'); 
      inputn.style.border = '2px solid red';
      inputo.style.border = '2px solid red';
      inputc.style.border = '2px solid red';
      console.log('i see you');
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg  navigation">
                <div className="d-flex align-items-center">
                  <Link className="navbar-brand" to="/dashboard">
                    <img src={mAnonymous} className="ligo" alt="" />
                  </Link>
                  <Link className="navbar-brand" to="/">
                    <h1 className="text-center">Anonymous</h1>
                  </Link>
                </div>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto mt-10">
                    <li className="nav-item">
                      <Link className="nav-link login-button" to="/dashboard">
                        <i className="fa fa-arrow-left"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* <!--==================================
=            User Profile            =
===================================--> */}
      <section className="dashboard section">
        {/* <!-- Container Start --> */}
        <div className="container">
          {/* <!-- Row Start --> */}
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-4 offset-lg-0">
              <div className="sidebar">
                {/* <!-- User Widget --> */}
                <div className="widget user-dashboard-profile">
                  {/* <!-- User Image --> */}
                  <div className="profile-thumb">
                    <img src={mAnonymous} alt="" className="rounded-circle" />
                  </div>
                  {/* <!-- User Name --> */}
                  <h5 className="text-center">{capitalise(user.username)}</h5>
                  <p>Joined {user.regDate}</p>
                </div>
                {/* <!-- Dashboard Links --> */}
                {/* <div className="widget user-dashboard-menu">
                  <ul>
                    <li>
                      <Link to="dashboard-my-ads.html">
                        <i className="fa fa-user"></i> My Ads
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="dashboard-favourite-ads.html">
                        <i className="fa fa-bookmark-o"></i> Favourite Ads{' '}
                        <span>5</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="dashboard-archived-ads.html">
                        <i className="fa fa-file-archive-o"></i>Archeved Ads{' '}
                        <span>12</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="dashboard-pending-ads.html">
                        <i className="fa fa-bolt"></i> Pending Approval
                        <span>23</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="logout.html">
                        <i className="fa fa-cog"></i> Logout
                      </Link>
                    </li>
                    <li>
                      <Link to="delete-account.html">
                        <i className="fa fa-power-off"></i>Delete Account
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-0">
              {/* <!-- Recently Favorited --> */}
              <div className="widget dashboard-container my-adslist">
                <h3 className="widget-header">{user.anonymous}</h3>
                <div class="widget personal-info">
                  <h3 class="widget-header user">Edit Username</h3>
                  <form action="#">
                    <div class="form-group">
                      <label for="comunity-name">Username</label>
                      <input
                        type="text"
                        class="form-control"
                        id="comunity-name"
                        value={capitalise(newUsername)}
                        onChange={Changeusername}
                      />
                    </div>

                    <button
                      class="btn btn-transparent"
                      onClick={Updateusername}
                    >
                      Save My Changes
                    </button>
                  </form>
                </div>
                <div class="widget change-password">
                  <h3 class="widget-header user">Edit Password</h3>
                  <div>
                    <div class="form-group">
                      <label for="current-password">Current Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="current-password"
                        onChange={Onchangeo}
                      />
                    </div>
                    <div class="form-group">
                      <label for="new-password">New Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="new-password"
                        onChange={Onchangen}
                      />
                    </div>
                    <div class="form-group">
                      <label for="confirm-password">Confirm New Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="confirm-password"
                        onChange={Onchangec}
                      />
                    </div>
                    <button class="btn btn-transparent" onClick={Changepwrd}>
                      Change Password
                    </button>
                  </div>
                </div>
                <div
                  style={{ cursor: 'pointer' }}
                  className="btn bg-danger btn-main-sm"
                  onClick={DeleteAccount}
                >
                  Delete Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
