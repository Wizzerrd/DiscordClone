import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Splash from './components/Splash'
import Channel from './components/Channel'
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import AppBase from './components/AppBase';
import { useSelector } from 'react-redux';


function App() {

  const sessionUser = useSelector(state => state.session.user);
  
  return (
      <Switch>

          <Route exact path='/' component={Splash} />
          <Route exact path='/login' component={LoginForm}/>
          <Route exact path='/register' component={RegisterForm}/>

          <Route path='/channels/@me'>
            <AppBase sessionUser={sessionUser} />
          </Route>

          <Route path='/channels/:serverId/:channelId'>
            <AppBase sessionUser={sessionUser} />
          </Route>

          <Route path='*' component={NotFound} />
      </Switch>
  );
}

export default App;
