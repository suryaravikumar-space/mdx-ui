import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../table";

function FullTable() {
  return (
    <Table>
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>2</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe("Table", () => {
  it("renders all cell content", () => {
    render(<FullTable />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Editor")).toBeInTheDocument();
  });

  it("renders caption", () => {
    render(<FullTable />);
    expect(screen.getByText("A list of users")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(<FullTable />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders a table element", () => {
    const { container } = render(<FullTable />);
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("wraps table in a scrollable div", () => {
    const { container } = render(<FullTable />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.nodeName).toBe("DIV");
    expect(wrapper.querySelector("table")).toBeInTheDocument();
  });

  it("TableHead renders as th", () => {
    render(<FullTable />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
  });

  it("applies custom className to Table", () => {
    const { container } = render(
      <Table className="compact-table">
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector("table")).toHaveClass("compact-table");
  });
});
