import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Create from "components/Articles/Create";
import Dashboard from "components/Dashboard";
import Settings from "components/Settings";
import Categories from "components/Settings/Categories";

const Main = () => {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/settings/categories" component={Categories} />
        <Route exact path="/article/(create|edit)" component={Create} />
      </Switch>
    </Router>
  );
};

export default Main;
