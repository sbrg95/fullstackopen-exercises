import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { initUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Navigation from './components/Navigation';

const App = () => {
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Navigation />
        <Notification />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
