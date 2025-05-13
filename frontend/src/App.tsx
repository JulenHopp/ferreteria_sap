import './App.css'
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

import TemporalNav from './__TemporalNav';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TemporalNav />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={ <Dashboard/> }
        />
      </Routes>
    </>
  )
}

export default App
