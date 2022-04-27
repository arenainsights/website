
import { Button, Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Component } from "react";
import { IUserInfo } from "../../../../backend/src/controllers/games";
import { getAllUsers } from "../../api/users";


export interface IUserListProps {

}

export interface IUserListState {
  pageSize: number
  columns: GridColDef[];
  users: IUserInfo[];
  error: string | undefined;
}

const DEFAULT_PAGE_SIZE = 20;

const getDefaultColumns = (): GridColDef[] => ([
  { headerName: 'User', field: 'username', flex: 1 },
  { headerName: 'Rating games played', field: 'ratingGamesPlayed', flex: 1 },
  { headerName: 'Active in Seasons', field: 'activeInSeasons', flex: 1 },
  { headerName: 'Fame', field: 'famePoints', flex: 1 },
  {
    headerName: "Action", field: "action", flex: 1, renderCell: (cellValues) => {
      return (<span><Button href={`/users/${cellValues.row.userId}`} variant="contained" color="secondary">
        Details
      </Button>
      </span>
      )
    }
  }
]);

export default class UserList extends Component<IUserListProps, IUserListState> {

  public constructor(props: IUserListProps) {
    super(props);
    this.state = {
      pageSize: DEFAULT_PAGE_SIZE,
      columns: getDefaultColumns(),
      users: [],
      error: undefined
    }
  }

  public async componentDidMount() {
    try {
      const userData = await getAllUsers();
      const { data: { users } } = userData;
      const usersConverted = users
        .sort((a, b) => b.famePoints - a.famePoints)
        .map(u => ({
          ...u,
          id: u.userId
        }));
      this.setState({ users: usersConverted });
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
            display: "flex",
            flexDirection: "column",
            height: "70vh",
          }}
        >
          <DataGrid
            loading={this.state.users.length === 0}
            rows={this.state.users}
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
