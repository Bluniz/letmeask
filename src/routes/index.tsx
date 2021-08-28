import { Home } from "pages/Home";
import { NewRoom } from "pages/NewRoom";
import { BrowserRouter as Router, Route } from "react-router-dom";

export function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </Router>
  );
}
