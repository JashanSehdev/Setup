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
} from "@mui/material";

import { users } from "@/data/users.data";

export default function EntityTable() {
  return (
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
                <Chip
                  label={user.role}
                  size="small"
                  variant="outlined"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={user.status}
                  size="small"
                  color={
                    user.status === "ACTIVE"
                      ? "success"
                      : "error"
                  }
                />
              </TableCell>

              <TableCell>
                {user.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}