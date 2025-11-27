import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Clueless from './Clueless';
import Infiltrator from './Infiltrator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clueless" element={<Clueless />} />
        <Route path="/infiltrator" element={<Infiltrator />} />
      </Routes>
    </Router>
  );
}

export default App;