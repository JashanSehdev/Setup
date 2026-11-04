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
} from "@mui/material";
import styles from "./user-table.module.css";

import { users } from "@/data/users.data";
import UserToolbar from "../user-toolbar/user-toolbar";

export default function UserTable() {
  return (
    <Box className={styles.container}>
      <UserToolbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.username}</TableCell>

                <TableCell>{user.email}</TableCell>

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

                <TableCell>{user.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
