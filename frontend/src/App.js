import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Splash from './components/Splash'
import Channel from './components/Channel'
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';

function App() {
  return (
      <Switch>

          <Route exact path='/login' component={LoginForm}/>
          <Route exact path='/register' component={RegisterForm}/>
          <Route path='/channels' component={Channel} />
          <Route exact path='/' component={Splash} />
          <Route path='*' component={NotFound} />
      </Switch>
  );
}

export default App;
