import { Home } from "pages/Home";
import { NewRoom } from "pages/NewRoom";
import { Room } from "pages/Room";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" exact component={Room} />
      </Switch>
    </Router>
  );
}
