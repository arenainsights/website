import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

export const sideBarItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/" >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component="a" href="/games">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Shared Games" />
    </ListItemButton>
    <ListItemButton component="a" href="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton component="a" href="/bots">
      <ListItemIcon>
        <SmartToyIcon />
      </ListItemIcon>
      <ListItemText primary="Bots" />
    </ListItemButton>
  </React.Fragment >
);
