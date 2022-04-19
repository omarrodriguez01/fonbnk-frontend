import './App.css';

import { Layout, RequireAuth } from './components';
import { StartPage, Dashboard, Statistics, Profile, Settings } from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* Public Routes */}
        <Route path="/" element={<StartPage />} />

        {/* Private Routes */}
        <Route element={<RequireAuth/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
