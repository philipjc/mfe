import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Header from './components/Header';
import AuthApp from "./components/AuthApp";
import MarketingApp from "./components/MarketingApp";

const generateClassNames = createGenerateClassName({
  productionPrefix: 'pa',
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassNames}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/auth" component={AuthApp} />
          <Route path="/" component={MarketingApp} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  )
};
