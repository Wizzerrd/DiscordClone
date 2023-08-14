import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import Splash from './components/Splash'
import Channel from './components/Channel'

function App() {
  return (
    <Routes>
        <Route path='/login' element={<UserForm />}/>
        <Route path='/register' element={<UserForm />}/>
        <Route path='/' element={<Splash />} />
        <Route path='/channels' element={<Channel />} />
    </Routes>
  );
}

export default App;
