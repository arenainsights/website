import BarChartIcon from '@mui/icons-material/BarChart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Component } from "react";
import { IGameInfoExtended } from "../../../../backend/src/controllers/games";
import { getValidGamesWithCode } from "../../api/games";
import CopyButton from "../utility/copy-button";



export interface IGameListEntry {
  id: string;
  arena: string;
  created: string;
  bots: string;
  winner: string;
  code: string;
}

export interface IGameListProps {
}

const DEFAULT_PAGE_SIZE = 20;

export interface IGameListState {
  pageSize: number;
  columns: GridColDef[];
  games: IGameListEntry[];
  error: string | undefined;
}

const getGameLinkFromCode = (code: string) => `screeps-arena://game/${code}`;

export const convertExtendedGameInfoToEntry = (game: IGameInfoExtended): IGameListEntry => {
  const botInfos: string[] = [];
  for (const bot of game.bots) {
    let username;
    for (const user of game.users) {
      if (user.userId === bot.userId) {
        username = `${user.username} ${(bot.version) ? "v" + bot.version : ""} `;
      }
    }
    if (!username) {
      username = "System";
    }
    botInfos.push(username);
  }
  botInfos.sort((a, b) => a.localeCompare(b))
  let winnerInfo = "Draw";
  if (game.gameResultWinner !== 0.5) {
    winnerInfo = botInfos[game.gameResultWinner];
  }
  const entry: IGameListEntry = {
    id: game.gameId,
    arena: `${game.arena.advanced ? "Advanced" : "Basic"} ${game.arena.name}`,
    created: game.gameCreated,
    bots: botInfos.join(" vs "),
    winner: winnerInfo,
    code: game.gameCode ?? ""
  };
  return entry;
}

const getDefaultColumns = (): GridColDef[] => ([
  { headerName: "Arena", field: "arena", flex: 1 },
  { headerName: "Created", field: "created", flex: 1 },
  { headerName: "Bots", field: "bots", flex: 1 },
  {
    headerName: "Action", field: "action", flex: 1, renderCell: (cellValues) => {
      return (<span>
        <CopyButton toCopy={`screeps-arena://game/${cellValues.row.code}`} color="secondary" description={<ContentCopyIcon />} />
        <Button href={`/games/${cellValues.row.code}`} variant="contained" color="secondary"> <BarChartIcon /> </Button>
        <Button href={getGameLinkFromCode(cellValues.row.code)} variant="contained" color="primary"><PlayArrowIcon /> </Button>
      </span>
      )
    }
  }
]);

export default class GameList extends Component<IGameListProps, IGameListState> {

  public constructor(props: IGameListProps) {
    super(props);
    this.state = {
      pageSize: DEFAULT_PAGE_SIZE,
      columns: getDefaultColumns(),
      games: [],
      error: undefined
    }
  }

  public async componentDidMount() {
    try {
      const gamesData = await getValidGamesWithCode();
      const { data: { games } } = gamesData;
      const gameEntries = games.map((g) => convertExtendedGameInfoToEntry(g));
      this.setState({ games: gameEntries });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err}` });
    }
  }

  public render() {
    return (<Grid container spacing={3}>
      <Grid item xs={12} >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "70vh",
          }}
        >
          <DataGrid
            loading={this.state.games.length === 0}
            rows={this.state.games}
            columns={this.state.columns}
            pageSize={this.state.pageSize}
            onPageSizeChange={(newPageSize) => { this.setState({ pageSize: newPageSize }) }}
            rowsPerPageOptions={[10, DEFAULT_PAGE_SIZE, 50]}
            pagination
          />
        </Paper>
      </Grid>
    </Grid >);
  }
}
