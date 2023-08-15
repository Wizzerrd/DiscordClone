import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Splash from './components/Splash'
import Channel from './components/Channel'
import RegisterForm from './components/RegisterForm';

function App() {
  return (
      <Switch>

          <Route path='/login' component={LoginForm}/>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/channels' component={Channel} />
          <Route exact path='/' component={Splash} />

      </Switch>
  );
}

export default App;
