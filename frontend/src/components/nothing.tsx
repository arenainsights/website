export const test = [];
/*

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


<h1>All Games</h1>
        <GameList
          games={gameEntries}
          itemsPerPage={20}
        />
        <BotList
          bots={botEntries}
          itemsPerPage={20}
        />
        */
