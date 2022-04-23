import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Nav, Stack, StackItem } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { getAllBots, IBotInfoExtended } from './api/bots';
import { getValidGamesWithCode, IGameInfoExtended } from './api/games';
import './App.css';
import BotList, { convertExtendedBotInfoToEntry } from './components/bot-list';
import GameList, { convertExtendedGameInfoToEntry } from './components/game-list';
initializeIcons();

const navigation = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
];

const App: React.FC = () => {
  let [games, setGames] = useState<IGameInfoExtended[]>([])
  let [bots, setBots] = useState<IBotInfoExtended[]>([])


  useEffect(() => {
    fetchGames();
    fetchBots();
  }, [])

  const fetchGames = (): void => {
    getValidGamesWithCode()
      .then(({ data: { games } }: IGameInfoExtended[] | any) => setGames(games))
      .catch((err: Error) => console.log(err))
  }

  const fetchBots = (): void => {
    getAllBots()
      .then(({ data: { bots } }: IBotInfoExtended[] | any) => setBots(bots))
      .catch((err: Error) => console.log(err))
  }

  const gameEntries = games.map((g) => convertExtendedGameInfoToEntry(g));

  const botEntries = bots
    .map(b => convertExtendedBotInfoToEntry(b))
    .sort((a, b) => {
      if (a.arena === b.arena) {
        if (a.user === b.user) {
          return a.rating - b.rating;
        }
        return a.user.localeCompare(b.user)
      }
      return a.arena.localeCompare(b.arena);
    }
    );

  return (
    <main className='App'>
      <Stack horizontal={true}>
        <StackItem>

          <Nav groups={navigation} />
        </StackItem>
        <StackItem>
          <h1>All Games</h1>
          <GameList
            games={gameEntries}
            itemsPerPage={20}
          />
          <BotList
            bots={botEntries}
            itemsPerPage={20}
          />
        </StackItem>
      </Stack>


    </main >
  )
}
export default App;
