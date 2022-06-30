import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import Header from './components/Header';
import Progress from "./components/Progress";

const LazyAuthApp = lazy(() => import("./components/AuthApp"));
const LazyMarketingApp = lazy(() => import("./components/MarketingApp"));

const generateClassNames = createGenerateClassName({
  productionPrefix: 'pa',
});

export default () => {
  // auth button is clicked callbacks set bool to true, then here in the container
  // the app knows if signed in or not. wrap components in isSignedIn tp hide/show.
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassNames}>
      <BrowserRouter>
        <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <Switch>
          <Suspense fallback={<Progress />}>
            <Route path="/auth">
              <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" exact>
              <LazyMarketingApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
          </Suspense>
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  )
};
