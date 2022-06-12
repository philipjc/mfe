import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const generateClassNames = createGenerateClassName({
  productionPrefix: 'ma',
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassNames}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Landing} />
          <Route exact path="/pricing" component={Pricing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  )
}
