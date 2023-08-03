import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import your components here

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* Define your routes here. Example: */}
        {/* <Route path="/login" component={Login} exact /> */}
      </Switch>
    </Router>
  );
};

export default AppRouter;