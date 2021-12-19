import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Create from "components/Articles/Create";
import Edit from "components/Articles/Edit";
import Dashboard from "components/Dashboard";
import Settings from "components/Settings";
import Categories from "components/Settings/Categories";
import Redirection from "components/Settings/Redirection";

const Main = () => {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/settings/categories" component={Categories} />
        <Route exact path="/settings/redirection" component={Redirection} />
        <Route exact path="/article/create" component={Create} />
        <Route exact path="/article/:id/edit" component={Edit} />
      </Switch>
    </Router>
  );
};

export default Main;
