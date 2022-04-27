import { Grid, Paper } from "@mui/material";
import { Component } from "react";

export interface INotFoundPageProps { }
export interface INotFoundPageState { }

export default class NotFoundPage extends Component<INotFoundPageProps, INotFoundPageState> {

  public render() {
    return (
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item xs={4} >
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>404 - not found.</div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
