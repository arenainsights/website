import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import stc from 'string-to-color';
import { IUserFame } from '../../../../backend/src/models/user-fame-series';
import { IUserInfo } from '../../../../backend/src/models/user-info-model';
import { getAllFameInfos } from '../../api/fame';
import { getAllUsers } from '../../api/users';

import Chart, {
  ArgumentAxis,
  Series,
  ZoomAndPan,
  Legend,
  ScrollBar,
} from 'devextreme-react/chart';

export default function FameDashboard() {

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

  const idToUser :Record<string,string> = {};
  for(const user of allUsers) {
    idToUser[user.userId] = user.username;
  }
 const data = new Map<string, Record<string,number>>();
for(const info of fameInfos) {
  const date = getDateFromMeta(info);
  const entry :Record<string, number>= data.get(date) || {};
  entry[idToUser[info.meta.userId]] = info.fame;
  data.set(date, entry);
}

const viz = [];
for(const keyVal of Array.from(data.entries())) {
  viz.push({
    date: keyVal[0],
    ...keyVal[1]
  })
}

  console.log(viz);


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
          <Chart
        id="chart"
        palette="Harmony Light"
        dataSource={viz}>


        <ArgumentAxis />
        <ScrollBar visible={true} />
        <ZoomAndPan argumentAxis="both" />
        <Legend visible={true} />
      </Chart>
          
          </Paper>


      </Grid>
    </Grid >
  )
}
