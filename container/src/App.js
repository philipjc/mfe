import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import Progress from "./components/Progress";

const LazyAuthApp = lazy(() => import("./components/AuthApp"));
const LazyMarketingApp = lazy(() => import("./components/MarketingApp"));
const LazyDashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassNames = createGenerateClassName({
  productionPrefix: 'dash',
});

// Was using BrowserHistory. BrowserHistory creates an instance of history for us.
// Getting access to history from BrowserHistory can be challenging.
// So we can create our own and have easier access to history.
const history = createBrowserHistory();

export default () => {
  // auth button is clicked callbacks set bool to true, then here in the container
  // the app knows if signed in or not. wrap components in isSignedIn tp hide/show.
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);


  return (
    <StylesProvider generateClassName={generateClassNames}>
      <Router history={history}>
        <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <Switch>
          <Suspense fallback={<Progress />}>
            <Route path="/auth">
              <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to='/' />}
              <LazyDashboardApp />
            </Route>
            <Route path="/">
              <LazyMarketingApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
          </Suspense>
        </Switch>
      </Router>
    </StylesProvider>
  )
};
