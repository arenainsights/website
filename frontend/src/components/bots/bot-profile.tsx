import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { IBotInfoExtended } from "../../../../backend/src/controllers/bots";
import { IBotRating } from "../../../../backend/src/models/bot-rating-series";
import { getBotRatingsByCodeId } from "../../api/bot-ratings";
import { getBotById } from "../../api/bots";

export default function BotProfile() {
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

  let [profile, setProfile] = useState<IBotInfoExtended>();
  let [ratings, setRatings] = useState<IBotRating[]>();

  useEffect(() => {
    fetchInfo(id ?? "");
    fetchRatings(id ?? "");
  }, [id]);

  const fetchInfo = (id: string) => {
    getBotById(id)
      .then((resp) => {
        setProfile({ ...resp.data.bot, });
      })
      .catch((err: Error) => console.log(err))
  }

  const fetchRatings = (id: string) => {
    getBotRatingsByCodeId(id)
      .then((resp) => {
        console.log(resp.data.botRatings);
        setRatings(resp.data.botRatings);
      })
      .catch((err: Error) => console.log(err))

  }
  if (!profile || !ratings) {
    return (<div>error loading</div>);
  }
  return (
    <div>
      <div>{profile.user.username} v{profile.version}</div>
      <Line data={{
        labels: ratings.map(r => r.date),
        datasets: [{
          label: `${profile.user.username} v${profile.version}`,
          data: ratings.map(r => r.rating),
          borderColor: "rgb(255,0,0)"
        }]
      }} />
    </div>
  )
}
