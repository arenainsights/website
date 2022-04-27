import { Grid, Paper } from "@mui/material";
import { Component } from "react";

export interface IInternalErrorPageProps { }
export interface IInternalErrorPageState { }

export default class InternalErrorPage extends Component<IInternalErrorPageProps, IInternalErrorPageState> {

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
            <div>500 - internal error.</div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
