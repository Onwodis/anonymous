import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import ParticlesBg from 'particles-bg';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <ParticlesBg type="lines" bg={true} /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import ParticlesBg from 'particles-bg';
// import App from './App';
// import './index.css';

// class Index extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: 'React',
//     };
//   }

//   render() {
//     return (
//       <div>
//         <SignIn />
//         <ParticlesBg type="random" bg={true} />
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById('root'));
