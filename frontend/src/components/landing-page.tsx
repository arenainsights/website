import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as React from 'react';

function LandingPage() {
  return (
    <Grid container spacing={3}>
      {/*
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <div>test</div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <div>other stuff</div>
        </Paper>
      </Grid>
        {*/}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          new landing page coming soon, check the menu :)
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
