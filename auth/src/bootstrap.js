import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory, createBrowserHistory} from 'history';
import App from './App';

const mount = (el, {onNavigate, defaultHistory, initialPath}) => {

  // create memory has an event; listen
  // defaultHistory: comes from development mode for isolation routing
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath], // solves x2 bug. bit hacky.
  });
  // createMemoryHistory starts with a history of '/'
  // App.js routing currently handles routes but no '/'
  // Bug: have to click Login x2 before seeing routes.

  if (onNavigate) {
    history.listen(onNavigate);
  }

  console.log('====================')
  console.log('mounting auth..');
  ReactDOM.render(<App history={history}/>, el);

  // parent (container) can run theses to communicate between.
  return {
    onParentNavigate({ pathname: nextPathname }) {
      console.log('Container just navigated.');
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export {mount};
