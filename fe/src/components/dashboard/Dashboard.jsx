import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import Anonymous from '../../anonymous.png';
import mAnonymous from '../../main_anonymous.png';

const Dashboard = ({
  user,
  setUser,
  friends,
  setFRiends,
  currentChat,
  setCurrentChat,
  newfriend,
  setNewfriend,
}) => {
  function capitalise(x) {
    var b = x.charAt(0).toUpperCase() + x.slice(1);
    return b;
  }
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  const [search, setSearch] = useState('');

  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const Searchsubmit = (e) => {
    e.preventDefault();
    
    if(search !== ''){
        axios.post('/search', { search: search }).then((res) => {
          if (res.data.signupfeedBack.success) {
            setUser(res.data.signupfeedBack.user);
            setNewfriend(res.data.signupfeedBack.newFriend);
            setCurrentChat(res.data.signupfeedBack.newFriend.email);


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
    else{
        swal({
          title: 'Input is empty !',
          text: 'Enter anonymous pin',
          icon: 'error',
          button: 'Ok!',
        });
    }
  };
  const Getano= (e)=>{
    e.preventDefault();
    // console.log("blurred")
    axios.get('/getan').then((res) => {
      

      if (res.data.signupfeedBack.success) {
        setUser(res.data.signupfeedBack.user);
        const tobecopied = res.data.signupfeedBack.user.anonymous;
        navigator.clipboard.writeText(tobecopied);
        console.log(tobecopied + ' is copied to clipboard');
        setIsShown((current) => true);
        const timeout = setTimeout(() => {
          setIsShown((current) => false);
        }, 2000);
        timeout();
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
      
    })
    

  }

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
        {/* <div class="col-6"> */}
        <div class="advance-search col-9 col-lg-5 col-md-7 ">
          <form>
            <div class="form-row d-flex justify-content-center ">
              <div class="form-group col-7 col-md-9 ">
                <input
                  type="text"
                  class="form-control text-dark"
                  id="inputLocation4"
                  placeholder="Paste pin"
                  onChange={Search}
                />
              </div>
              <div class="form-group col-4 col-md-1 ">
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
        {/* </div> */}
      </div>
      {/* <!--==================================
=            User Profile            =
===================================--> */}
      <section className="dashboard section">
        {/* <!-- Container Start --> */}
        <div className="container">
          {/* <!-- Row Start --> */}
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-12 offset-lg-0">
              <h2 className="text-center">{capitalise(user.username)}</h2>
              <h2
                style={{ display: isShown ? 'block' : 'none' }}
                className="popin"
              >
                copied to clipboard
              </h2>

              <div className="widget col-12 col-lg-12 col-md-12 dashboard-container my-adslist ">
                {/* <sub>copy userpin</sub> */}

                <del className="widget-header" onClick={Getano}>
                  {user.anonymous + '1'}
                </del>
                <table className="table table-responsive product-dashboard-table">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Anonymous</th>
                      <th className="text-center lm">Last message</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-thumb">
                        <img
                          width="80px"
                          height="auto"
                          src={Anonymous}
                          alt="imagedescription"
                        />
                      </td>
                      <td className="product-details">
                        <div className="">
                          <h3 className="title">hg6577jhj</h3>
                          <span className="add-id">I will send it</span>
                        </div>
                        {/* <span>
                          <strong>Posted on: </strong>
                          <time>Jun 27, 2017</time>{' '}
                        </span>
                        <span className="status active">
                          <strong>Status</strong>Active
                        </span>
                        <span className="location">
                          <strong>Location</strong>Dhaka,Bangladesh
                        </span> */}
                      </td>
                      <td className="product-category lm">
                        <span className="categories">hi bola</span>
                      </td>
                      <td className="action" data-title="Action">
                        <div className="">
                          <ul className="list-inline justify-content-center">
                            {/* <li className="list-inline-item">
                              <Link
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Tooltip on top"
                                className="view"
                                to=""
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>
                            </li> */}
                            <li className="list-inline-item">
                              <Link className="delete" to="">
                                <i className="fa fa-trash"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
