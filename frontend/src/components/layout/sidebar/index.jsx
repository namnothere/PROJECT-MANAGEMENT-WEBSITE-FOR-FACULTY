import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function Sidebar({ listSidebar }) {
  return (
    <List sx={{ backgroundColor: "  rgba(244, 242, 242,0.9)" }}>
      {listSidebar?.map((sidebar, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton href={sidebar?.href}>
            <ListItemIcon>{sidebar?.icon}</ListItemIcon>
            <ListItemText primary={sidebar?.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default Sidebar;
