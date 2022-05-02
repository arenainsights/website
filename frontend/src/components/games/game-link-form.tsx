import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CopyButton from "../utility/copy-button";

export default function GameLinkForm() {

  let [code, setCode] = useState<string>("");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField id="code-input" label="Code" variant="outlined" helperText="Paste Game Code here, the links will automatically update"
            onChange={(event) => {
              setCode(event.target.value);
            }} />
        </Paper>
      </Grid>
      <Grid item xs={12} xl={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography>Link: <Link href={`https://arenainsights.net/link-game/${code}`} >{`https://arenainsights.net/link-game/${code}`}</Link> <CopyButton toCopy={`https://arenainsights.net/link-game/${code}`} color="primary" description={<ContentCopyIcon />} /></Typography>


        </Paper>
      </Grid>
    </Grid>);
}
