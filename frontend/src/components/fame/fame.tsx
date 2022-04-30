import { Grid, Paper, Typography } from '@mui/material';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import stc from 'string-to-color';
import { IUserFame } from '../../../../backend/src/models/user-fame-series';
import { IUserInfo } from '../../../../backend/src/models/user-info-model';
import { getAllFameInfos } from '../../api/fame';
import { getAllUsers } from '../../api/users';

export default function FameDashboard() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let [allUsers, setAllUsers] = useState<IUserInfo[]>([]);
  let [fameInfos, setFameInfo] = useState<IUserFame[]>([]);

  useEffect(() => {
    fetchInfo();
    fetchFameInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const resp = await getAllUsers();
      const { data: { users } } = resp;
      setAllUsers(users.sort((a, b) => b.famePoints - a.famePoints).slice(0, 20));
    } catch (err) {
      console.log(err);
    }
  }

  const fetchFameInfo = async () => {
    try {
      const resp = await getAllFameInfos();
      console.log(resp);
      setFameInfo(resp.data.fameInfos);
    } catch (err) {
      console.log(err);
    }
  }



  if (!allUsers) {
    return (<div>error loading users</div>);
  }
  if (!fameInfos) {
    return (<div>error loading fame infos</div>);
  }

  const getDateFromMeta = (rating: { date: string | Date }) => (new Date(rating.date)).toLocaleDateString();

  const labelSet = new Set<string>();
  for (const rating of fameInfos) {
    labelSet.add(getDateFromMeta(rating));
  }
  const labels = Array.from(labelSet).sort((a, b) => a.localeCompare(b));
  const fameDataSets = [];
  for (const user of allUsers) {
    const relevantFame = fameInfos.filter(r => r.meta.userId === user.userId);
    const fameData = new Array(labels.length);
    for (const f of relevantFame) {
      const date = getDateFromMeta(f);
      const index = labels.findIndex((d) => d === date);
      if (index >= 0) {
        fameData[index] = f.fame;
      }
    }

    const label = user.username;
    fameDataSets.push({
      label,
      data: fameData,
      borderColor: stc(label)
    });
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
          <Typography>Fame (top 20)</Typography>
          <Line data={{
            labels,
            datasets: fameDataSets
          }} style={{ maxHeight: "200px" }} /> </Paper>

      </Grid>
    </Grid >
  )
}
