import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import PrivateRoute from './components/PriveRoute/PrivateRoute';

function App() {
  return (
    <div className="app">
        <Switch>
          <Redirect from="/home" to="/" exact />
          <Redirect from="/" to="/products" exact />

          <Route path="/auth/login" exact component={Login} />
          <PrivateRoute path="/" component={Layout} />
        </Switch>
    </div>
  );
}

export default App;
