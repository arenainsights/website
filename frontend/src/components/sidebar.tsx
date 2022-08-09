import AddLinkIcon from '@mui/icons-material/AddLink';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ForumIcon from '@mui/icons-material/Forum';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PeopleIcon from '@mui/icons-material/People';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React from "react";

export const sideBarItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/" >
      <ListItemIcon>
        <img src="/android-chrome-192x192.png" alt="arena insights Logo" height={"24px"} />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component="a" href="/games">
      <ListItemIcon>
        <LiveTvIcon />
      </ListItemIcon>
      <ListItemText primary="Shared Games" />
    </ListItemButton>
    <ListItemButton component="a" href="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton component="a" href="/fame/">
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <ListItemText primary="Fame" />
    </ListItemButton>
    <ListItemButton component="a" href="/link-game/">
      <ListItemIcon>
        <AddLinkIcon />
      </ListItemIcon>
      <ListItemText primary="Fame" />
    </ListItemButton>
    <Divider />
    <ListSubheader component="div" inset>
      other resources
    </ListSubheader>
    <ListItemButton component="a" href="https://discord.com/invite/screeps" target={"_blank"}>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Screeps Discord" />
    </ListItemButton>
  </React.Fragment >
);
