import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGameInfoExtended } from '../../../../backend/src/controllers/games';
import { getGameByCode } from '../../api/games';
import NotFoundPage from '../errors/not-found';

export default function GameDetails() {


  let { code } = useParams();

  let [info, setInfo] = useState<IGameInfoExtended>();

  useEffect(() => {
    fetchGameInfo(code ?? "");
  }, [code]);

  const fetchGameInfo = (code: string) => {
    getGameByCode(code)
      .then((resp) => {
        setInfo({ ...resp.data.game });
      })
      .catch((err) => console.log(err));
  }

  if (!info) {
    return (<NotFoundPage />);
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography> Game: {info.gameCode}</Typography>
        </Paper>


      </Grid>
    </Grid>
  )
}
