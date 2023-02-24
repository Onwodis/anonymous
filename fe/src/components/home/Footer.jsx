import React from 'react'
import { Link } from 'react-router-dom';
import Anonyhead from '../dashboard/Anonyhead';
import ParticlesBg from 'particles-bg';


const Footer = () => {
  return (
    <>
      <div>
        <footer className="footer section section-sm">
          <div className="container align-items-center">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-7 offset-md-1 offset-lg-0">
                <div className="d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <Anonyhead />
                  </Link>
                  <Link className="navbar-brandn" to="/">
                    <h1 className="text-light">Anonymous</h1>
                  </Link>
                </div>
                <p className="alt-color">
                  We pride ourselves with a global record of over 5M clients.
                </p>
              </div>

              <div className="col-lg-4 col-md-7">
                <div className="block-2 app-promotion">
                  <Link to="">
                    <Anonyhead />
                  </Link>
                  <p>Get the Meetup Mobile App and Enjoy more</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-5 offset-md-1 offset-lg-0">
                <small id="gee">
                  ...Phishers are strictly forbidden on this platform
                </small>
              </div>
            </div>
          </div>
        </footer>
        <footer className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="copyright">
                  <p>Copyright © 2023. All Rights Reserved</p>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <ul className="social-media-icons text-right">
                  <li>
                    <Link className="fa fa-facebook" to=""></Link>
                  </li>
                  <li>
                    <Link className="fa fa-twitter" to=""></Link>
                  </li>
                  <li>
                    <Link className="fa fa-pinterest-p" to=""></Link>
                  </li>
                  <li>
                    <Link className="fa fa-vimeo" to=""></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="top-to">
            <Link id="top" className="" to="">
              <i className="fa fa-angle-up"></i>
            </Link>
          </div>
        </footer>
        <ParticlesBg>


            
        </ParticlesBg>
        
      </div>
    </>
  );
}

export default Footer