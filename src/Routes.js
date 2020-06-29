import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import View from "./containers/View";
import Upload from "./containers/Upload";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ViewFamily from "./containers/ViewFamily";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/view">
        <View />
      </Route>
      <Route path="/viewfamily/:family" component={ViewFamily} />
      <Route exact path="/upload">
        <Upload />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
