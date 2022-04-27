import { Grid, Paper, Typography } from '@mui/material';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import stc from 'string-to-color';
import { IArenaInfo } from '../../../../backend/src/controllers/games';
import { IUserInfoExtended } from '../../../../backend/src/controllers/users';
import { IUserRating } from '../../../../backend/src/models/user-rating-series';
import { getAllArenas } from "../../api/arenas";
import { getUserById } from "../../api/users";

export default function UserDetails() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let { id } = useParams();

  let [profile, setProfile] = useState<IUserInfoExtended>();
  let [arenas, setArenas] = useState<IArenaInfo[]>();
  let [arenaLookup, setArenaLookup] = useState<{ [id: string]: IArenaInfo }>();

  useEffect(() => {
    fetchInfo(id ?? "");
    fetchArenas();
  }, [id]);

  const fetchInfo = (id: string) => {
    getUserById(id)
      .then((resp) => {
        setProfile({ ...resp.data.user, });
      })
      .catch((err: Error) => console.log(err))
  }
  const fetchArenas = () => {
    getAllArenas()
      .then((resp) => {
        setArenas(resp.data.arenas);
        const lookup: { [id: string]: IArenaInfo } = {};
        for (const arena of resp.data.arenas) {
          lookup[arena.arenaId] = arena;
        }
        setArenaLookup(lookup);
      })
      .catch((err: Error) => console.log(err))
  }
  if (!profile) {
    return (<div>error loading</div>);
  }
  if (!arenas) {
    return (<div>error loading arenas</div>);
  }
  if (!arenaLookup) {
    return (<div>error loading arenas</div>);
  }

  const getDateFromRating = (rating: IUserRating) => (new Date(rating.date)).toLocaleDateString();

  const labelSet = new Set<string>();
  for (const rating of profile.ratings) {
    labelSet.add(getDateFromRating(rating));
  }
  const labels = Array.from(labelSet).sort((a, b) => a.localeCompare(b));
  const ratingDataSets = [];
  const rankDataSets = [];
  for (const arenaInfo of profile.arenas) {
    const arena = arenaLookup ? arenaLookup[arenaInfo.arenaId] : undefined;
    if (!arena) {
      continue;
    }
    const relevantRatings = profile?.ratings.filter(r => r.meta.arenaId === arena.arenaId);
    const ratingData = new Array(labels.length);
    const rankData = new Array(labels.length);
    for (const rating of relevantRatings) {
      const date = getDateFromRating(rating);
      const index = labels.findIndex((d) => d === date);
      if (index >= 0) {
        ratingData[index] = rating.rating;
        rankData[index] = -rating.rank;
      }
    }
    const label = `${arena.advanced ? "Advanced" : "Basic"} ${arena.name}`;
    ratingDataSets.push({
      label,
      data: ratingData,
      borderColor: stc(label)
    });
    rankDataSets.push({
      label,
      data: rankData,
      borderColor: stc(label)
    })
  };
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
          <Typography> User: {profile.username}</Typography>
        </Paper>

      </Grid>
      <Grid item xs={6} >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Line data={{
            labels,
            datasets: ratingDataSets
          }} />
        </Paper>


      </Grid><Grid item xs={6} >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Line data={{
            labels,
            datasets: rankDataSets
          }} />
        </Paper>


      </Grid>
    </Grid>
  )
}