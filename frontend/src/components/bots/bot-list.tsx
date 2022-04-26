import { Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Component } from "react";
import { IBotInfoExtended } from "../../../../backend/src/controllers/bots";
import { getAllBots } from "../../api/bots";


export interface IBotListEntry {
  id: string;
  codeId: string;
  arena: string;
  user: string;
  version: number;
  rating: number;
  lastSeen: string;
}

export interface IBotListProps {
}

const DEFAULT_PAGE_SIZE = 20;

export interface IBotListState {
  columns: GridColDef[];
  bots: IBotListEntry[];
  error: string | undefined;
  pageSize: number;
}

export const convertExtendedBotInfoToEntry = (bot: IBotInfoExtended): IBotListEntry => {
  const entry: IBotListEntry = {
    id: bot.codeId,
    codeId: bot.codeId,
    arena: `${bot.arena.advanced ? "Advanced" : "Basic"} ${bot.arena.name}`,
    user: bot.user.username,
    version: bot.version,
    rating: bot.rating,
    lastSeen: ""
  };
  return entry;
}

const getDefaultColumns = (): GridColDef[] => ([
  { headerName: 'Arena', field: 'arena', flex: 1 },
  { headerName: 'User', field: 'user', flex: 1 },
  { headerName: 'Version', field: 'version', flex: 1 },
  { headerName: 'Rating', field: 'rating', flex: 1 },
  { headerName: 'Last Seen', field: 'lastSeen', flex: 1 }]);
export default class BotList extends Component<IBotListProps, IBotListState> {

  public constructor(props: IBotListProps) {
    super(props);
    this.state = {
      pageSize: DEFAULT_PAGE_SIZE,
      columns: getDefaultColumns(),
      bots: [],
      error: undefined
    }
  }

  public async componentDidMount() {
    try {
      const botData = await getAllBots();
      const { data: { bots } } = botData;
      const botsConverted = bots
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
      this.setState({ bots: botsConverted });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err}` })
    }
  }

  public render() {
    return (<Grid container spacing={3}>
      <Grid item xs={12} >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: "70vh",
          }}
        >
          <DataGrid
            loading={this.state.bots.length === 0}
            rows={this.state.bots}
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
