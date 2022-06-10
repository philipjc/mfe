import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mount = el => {
  console.log('mounting marketing..')
  ReactDOM.render(
    <App />,
    el,
  )
};

if (process.env.NODE_ENV === 'development') {
  const marketingRoot = document.querySelector('#_marketing-dev-root');

  if (marketingRoot) {
    mount(marketingRoot);
  }
}

export { mount };
