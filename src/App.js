import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import routers from "./route/index";
import Layouts from "./views/layout";
import MySpin from "./components/mySpin/mySpin";

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Layouts>
          {routers.map((r, key) => (
            <Route
              component={r.component}
              exact={!!r.exact}
              key={key}
              path={r.path}
            />
          ))}
        </Layouts>
      </Switch>
      <MySpin />
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
