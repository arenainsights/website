import { Link, Typography } from "@mui/material";
import { IMeta } from "../../../backend/src/models/meta-model";

function Footer(props: { meta: IMeta }) {
  return (<span>
    <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
      database: {props.meta.userCount} users, {props.meta.gameCount} games, {props.meta.botCount} bots.
      <br />
      scraping: last run: {props.meta.lastRun}, last full run: {props.meta.lastFullRun}
      <br />
      {'© '}{new Date().getFullYear()}{" "}
      <Link color="inherit" href="https://arenainsights.net">
        arenainsights.net
      </Link>
    </Typography>
  </span>
  );
}

export default Footer;
