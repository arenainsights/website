import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack, StackItem } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ISettings } from '../../backend/src/models/settings-model';
import { getCrawlerMeta } from './api/meta';
import './App.css';
import BotPage from './components/bot-page';
import GamePage from './components/game-page';
import LandingPage from './components/landing-page';
initializeIcons();

const App: React.FC = () => {
  let [meta, setMeta] = useState<ISettings>({ lastFullRun: (new Date(0)).toISOString(), lastRun: (new Date(0)).toISOString(), key: "" })


  useEffect(() => {
    fetchMeta();
  }, [])

  const fetchMeta = (): void => {
    getCrawlerMeta()
      .then(({ data: { settings } }: ISettings | any) => {
        console.log(settings);
        setMeta(settings)
      })
      .catch((err: Error) => console.log(err))
  }
  return (
    <main className='App'>
      <Stack>
        <StackItem>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/bots" element={<BotPage />} />
              <Route path="/games" element={<GamePage />} />
            </Routes>
          </BrowserRouter>
        </StackItem>
        <StackItem>
          last checked: {meta.lastRun}, last full run: {meta.lastFullRun}
        </StackItem>
      </Stack>


    </main >
  )
}
export default App;
