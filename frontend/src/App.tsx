import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack } from '@fluentui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landing-page';
initializeIcons();

const App: React.FC = () => {

  return (
    <main className='App'>
      <Stack horizontal={true}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bots" element={<div>bots</div>} />
            <Route path="/games" element={<div>games</div>} />
          </Routes>
        </BrowserRouter>
      </Stack>


    </main >
  )
}
export default App;
