import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { IArenaInfo } from '../../../../backend/src/controllers/games';
import { IUserInfoExtended } from '../../../../backend/src/controllers/users';
import { getAllArenas } from "../../api/arenas";
import { getUserById } from "../../api/users";

export default function UserProfile() {
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

  const datasets = [];
  for (const arenaInfo of profile.arenas) {
    const arena = arenaLookup ? arenaLookup[arenaInfo.arenaId] : undefined;
    if (!arena) {
      continue;
    }
    const dataset = {
      label: `${arena.advanced ? "Advanced" : "Basic"} ${arena.name}`,
      data: profile?.ratings.filter(r => r.meta.arenaId === arena.arenaId).map(r => r.rating),
    }
    datasets.push(dataset);
  };
  console.log(datasets);
  return (
    <div>
      <div>{profile.username}</div>
      <Line data={{ datasets }} />
    </div>
  )
}
