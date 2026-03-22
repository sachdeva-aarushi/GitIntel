import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Structure from './pages/Structure';
import Health from './pages/Health';
import Risk from './pages/Risk';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/health" element={<Health />} />
            <Route path="/risk" element={<Risk />} />
        </Routes>
    );
}

export default App;
