import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';

import './app.css';
import styles from './styles.module.css';

// Note: this process of React.creatClass is the es5 way of creating a React component
const App = React.createClass({
  render: function() {
    return (
      <div className={styles.wrapper}>
        <h1>
          <i className="fa fa-star"></i>
          Environment: {__NODE_ENV__}
        </h1>
        <p>I would like to see this app work and get finished eventually!</p>
        <p>Please just focus and GET IT DONE!</p>
      </div>
    )
  }
});

const mountNode = document.querySelector('#root');
ReactDOM.render(<App />, mountNode);
