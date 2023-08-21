import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Splash from './components/Splash'
import Channel from './components/Channel'
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import AppBase from './components/AppBase';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/users';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user);

  return (
    <Switch>

          <Route exact path='/' component={Splash} />
          <Route exact path='/login' component={LoginForm}/>
          <Route exact path='/register' component={RegisterForm}/>

          <Route exact path='/channels/:serverId'>
            <AppBase />
          </Route>

          <Route exact path='/channels/:serverId/:channelId'>
            <AppBase />
          </Route>

          <Route path='*' component={NotFound} />
      </Switch>
  );
}

export default App;
