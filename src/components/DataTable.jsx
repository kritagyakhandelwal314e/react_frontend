import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable({providers, handleAddProviderOpen, ...props}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" rowSpan={2}>Name</TableCell>
            <TableCell align="left" rowSpan={2}>Active</TableCell>
            <TableCell align="left" rowSpan={2}>Department</TableCell>
            <TableCell align="center" colSpan={3}>Action</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
          <TableRow>
            {/* <TableCell align="left"></TableCell> */}
            <TableCell align="center" colSpan={3}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleAddProviderOpen}
              >
                Add Provider
              </Button>
            </TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((row) => (
            <TableRow key={row.provider_name}>
              <TableCell component="th" scope="row">
                {row.provider_name}
              </TableCell>
              <TableCell align="left">{row.provider_active ? "YES" : "NO"}</TableCell>
              <TableCell align="left">{row.provider_department ? row.provider_department : "Not Mentioned"}</TableCell>
              <TableCell align="left">
                <Button 
                  variant="contained" 
                  color="primary" 
                >
                  VIEW
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  color="secondary" 
                >
                  EDIT
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  color="default" 
                >
                  DELETE
                </Button>
              </TableCell>  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
