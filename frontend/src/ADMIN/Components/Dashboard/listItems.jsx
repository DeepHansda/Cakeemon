import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import { FiAirplay, FiBarChart, FiBarChart2, FiDatabase, FiGitBranch, FiLayers, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/admin/main">
    <ListItemButton>
      <ListItemIcon>
        <FiDatabase />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton></Link>


<Link to="/admin/orders">
    <ListItemButton>
      <ListItemIcon>
        <FiShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton></Link>

    <Link to="/admin/customers">

    <ListItemButton>
      <ListItemIcon>
        <FiUser />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    </Link>
    

    <Link to="/admin/products">
    <ListItemButton>
      <ListItemIcon>
        <FiLayers />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    </Link>

    <Link to="/admin/extras">
    <ListItemButton>
      <ListItemIcon>
        <FiBarChart2 />
      </ListItemIcon>
      <ListItemText primary="Utils" />
    </ListItemButton>
    </Link>
  </React.Fragment>


);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <FiAirplay />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FiGitBranch />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <FiGitBranch />

      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
