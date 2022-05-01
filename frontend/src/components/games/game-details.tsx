import PeopleIcon from '@mui/icons-material/People';
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGameInfoExtended } from '../../../../backend/src/controllers/games';
import { getGameByCode } from '../../api/games';
import { getArenaNameFromInfo } from '../../utils/utils';
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
          <Typography>Arena: {getArenaNameFromInfo(info.arena)}</Typography>
          <Typography>Ticks: {info.ticks}</Typography>
        </Paper>
      </Grid>
      {info.users.map((user, i) => {
        const bot = info?.bots.find(b => b.userId === user.userId);
        return (
          <Grid item xs={6} key={`user-${i}`} >
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography>User {i + 1}</Typography>
              <Typography>{user.username} v{bot?.version} <Button href={`/users/${user.userId}`} variant="contained" color="primary"><PeopleIcon /></Button> <Button href={`/bots/${bot?.codeId}`} variant="contained" color="secondary"><SmartToyIcon /></Button></Typography>
            </Paper>
          </Grid>
        );
      })
      }
    </Grid>
  )
}
