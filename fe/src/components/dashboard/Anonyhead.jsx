import { Link} from 'react-router-dom';
import React, { useState } from 'react';
// import './metal.css'
import mAnonymous from '../../main_anonymous.png';

const Anonyhead = ({actionss}) => {
  const [actions,setAction]= useState('/')
  if(actionss){
    setAction(actionss)
    console.log(actionss + " is actionss")
  }
  
  return (
    <div className="press">
      <div className="d-flex align-items-center ">
        <Link className="navbar-brand" to={actions}>
          <img src={mAnonymous} className="ligo" alt="" />
        </Link>
        <Link className="navbar-brand" to="/">
          <h1 className="text-center ann metal">Anonymous</h1>
          
        </Link>
      </div>
    </div>
  );
};

export default Anonyhead;
