import React from 'react'
import { Link} from 'react-router-dom';
import Anonyhead from '../dashboard/Anonyhead';


const Home = () => {
  return (
    <div>
      <section className="fixo">
        <div className="container">
          <div className="row ">
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

      <section className="hero-area bg-1 text-center overly">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-block">
                <h1>Secure your Chats ! </h1>
                <p>
                  Join the millions who no longer have to <br /> worry abut
                  leaked messages.
                </p>
                <small style={{ color: 'whitesmoke' }}>Be Anonymous</small>

                <div
                  className=" navbar-collapse col-12 mt-5 hidee"
                  id="navbarSupportedContent"
                >
                  <ul className=" mt-2">
                    {/* <li className="">
                      <Link className=" text-light" to="/loginpage">
                        Login
                      </Link>
                    </li>
                    <br /> */}
                    <li className="">
                      <Link className="text-light" to="/signuppage">
                        <i className="fa fa-pencil"></i> Signup
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="short-popular-category-list text-center">
                  <h2>Popular Category</h2>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <Link to="">
                        <i className="fa fa-child"></i> 18+
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="">
                        <i className="fa fa-user"></i> 25+
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="">
                        <i className="fa fa-user"></i>35+
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="">
                        <i className="fa fa-female"></i> 50+
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="">
                        <i className="fa fa-male"></i> 60+
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home