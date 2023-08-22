import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Splash from './components/Splash'
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';
import AppBase from './components/AppBase';

function App() {

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
