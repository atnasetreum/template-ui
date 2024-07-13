"use client";

import * as React from "react";

import { useBoundStore } from "@store";
import { dataTimeFormat } from "@shared/utils";
import { StyledTableCell, StyledTableRow, TableDefault } from "@components";

export const TableUsers = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const users = useBoundStore((state) => state.users);

  return (
    <TableDefault
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      colSpan={4}
      count={users.length}
      headers={["ID", "Name", "Email", "Created at"]}
      body={(rowsPerPage > 0
        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : users
      ).map((user) => (
        <StyledTableRow key={user.id}>
          <StyledTableCell component="th" scope="row">
            {user.id}
          </StyledTableCell>
          <StyledTableCell>{user.name}</StyledTableCell>
          <StyledTableCell>{user.email}</StyledTableCell>
          <StyledTableCell>{dataTimeFormat(user.createdAt)}</StyledTableCell>
        </StyledTableRow>
      ))}
    />
  );
};
