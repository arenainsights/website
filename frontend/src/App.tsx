import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack, StackItem, ThemeProvider, Toggle } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { IMeta } from '../../backend/src/models/meta-model';
import { getCrawlerMeta } from './api/meta';
import './App.css';
import BotList from './components/bots/bot-list';
import ContentPage from './components/content-page';
import GameList from './components/games/game-list';
import LandingPage from './components/landing-page';
import NotFoundPage from './components/not-found-page';
import UserList from './components/users/user-list';
import UserProfile from './components/users/user-profile';
import { darkTheme, defaultTheme } from './themes';


initializeIcons();

const THEME_COOKIE_KEY = "darkMode";
const cookies = new Cookies();

const App: React.FC = () => {
  let [meta, setMeta] = useState<IMeta>({
    lastFullRun: (new Date(0)).toISOString(),
    lastRun: (new Date(0)).toISOString(),
    key: "",
    userCount: 0,
    botCount: 0,
    gameCount: 0
  })
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
      .then(({ data: { meta } }: IMeta | any) => {
        setMeta(meta)
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
                  <Route path="/bots" element={<ContentPage content={<BotList itemsPerPage={20} />} />} />
                  <Route path="/games" element={<ContentPage content={<GameList itemsPerPage={20} />} />} />
                  <Route path="/users" element={<ContentPage content={<UserList itemsPerPage={20} />} />} />
                  <Route path="/users/:id" element={<ContentPage content={<UserProfile />} />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </StackItem>
            <StackItem>
              tracking: {meta.userCount} users, {meta.gameCount} games, {meta.botCount} bots.
            </StackItem>
            <StackItem>
              scraping: last run: {meta.lastRun}, last full run: {meta.lastFullRun}
            </StackItem>
          </Stack>
        </main>

      </ThemeProvider>
    </React.StrictMode>

  )
}
export default App;
