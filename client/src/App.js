import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Korisnici from './pages/Korisnici';
import Putovanja from './pages/Putovanja';


function App() {
  return (
    
        <Router>
          <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/korisnici" element={<Korisnici />}/>
          <Route path="/putovanja" element={<Putovanja />} />
          </Routes>
        </Router>
    
  );
}

export default App;
