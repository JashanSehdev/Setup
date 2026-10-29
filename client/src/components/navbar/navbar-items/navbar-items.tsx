import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import styles from "./navbar-items.module.css";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';

const navItems = [
  {
    icon : < HomeIcon/>,
    label: "HOME",
    href: "/",
  },
  {
    icon : <AssignmentIcon/>,
    label : "TASKS",
    href : '/tasks'
  },

];
export default function NavbarItems() {
  return (
    <Stack >
      <List >
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.link}>
            <ListItem
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Stack>
  );
}
