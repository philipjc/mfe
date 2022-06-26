import React from 'react';
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassNames = createGenerateClassName({
  productionPrefix: 'au',
});

export default ({ history }) => {
  return (
    <StylesProvider generateClassName={generateClassNames}>
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin" component={Signin} />
          <Route path="/auth/signup" component={Signup} />
        </Switch>
      </Router>
    </StylesProvider>
  )
}
