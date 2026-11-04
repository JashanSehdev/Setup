"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Pagination,
} from "@mui/material";
import styles from "./user-table.module.css";
import UserToolbar from "../user-toolbar/user-toolbar";
import useUsers from "@/hooks/admin/useUsers";

export default function UserTable() {
  const {users, totalPages, page, setPage, handleFiltersChange} = useUsers()
  return (
    <Box className={styles.container}>
      <UserToolbar handleFiltersChange={handleFiltersChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">User</TableCell>

              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  {user.id}
                </TableCell>
                <TableCell>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={user.email}
                    />
                  </ListItem>
                </TableCell>

                <TableCell>
                  <Chip label={user.role} size="small" variant="outlined" />
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    color={user.status === "ACTIVE" ? "success" : "error"}
                  />
                </TableCell>

                <TableCell>{user.createdAt.slice(0,10)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          <Pagination defaultPage={page ?? 1} onChange={(_, page)=> (setPage(page))} color="primary" count={totalPages}/> 
      </TableContainer>
    </Box>
  );
}
