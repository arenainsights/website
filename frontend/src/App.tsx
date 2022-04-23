import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack, StackItem, ThemeProvider, Toggle } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ISettings } from '../../backend/src/models/settings-model';
import { getCrawlerMeta } from './api/meta';
import './App.css';
import BotPage from './components/bot-page';
import GamePage from './components/game-page';
import LandingPage from './components/landing-page';
import NotFoundPage from './components/not-found-page';
import { darkTheme, defaultTheme } from './themes';


initializeIcons();

const THEME_COOKIE_KEY = "darkMode";
const cookies = new Cookies();

const App: React.FC = () => {
  let [meta, setMeta] = useState<ISettings>({ lastFullRun: (new Date(0)).toISOString(), lastRun: (new Date(0)).toISOString(), key: "" })
  let [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    fetchMeta();
    if (cookies.get(THEME_COOKIE_KEY)) {
      const val = cookies.get(THEME_COOKIE_KEY);
      if (val === "true") {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  }, [])

  const fetchMeta = (): void => {
    getCrawlerMeta()
      .then(({ data: { settings } }: ISettings | any) => {
        setMeta(settings)
      })
      .catch((err: Error) => console.log(err))
  }
  return (
    <React.StrictMode>

      <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
        <main className='App'>
          <Stack>
            <StackItem>
              <Toggle
                onText='dark'
                offText='light'
                defaultChecked={cookies.get(THEME_COOKIE_KEY) === "true"}
                onChange={(event, checked) => {
                  setDarkMode(checked ?? false);
                  cookies.set(THEME_COOKIE_KEY, checked ?? false);
                }} />
            </StackItem>
            <StackItem>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/bots" element={<BotPage />} />
                  <Route path="/games" element={<GamePage />} />
                  <Route element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </StackItem>
            <StackItem>
              last checked: {meta.lastRun}, last full run: {meta.lastFullRun}
            </StackItem>
          </Stack>
        </main>

      </ThemeProvider>
    </React.StrictMode>

  )
}
export default App;
