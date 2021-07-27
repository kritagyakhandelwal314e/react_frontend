import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  spacingMargin: {
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    maxHeight: 640,
  },
  header: {
    color: "#fff", 
    fontSize: "1.2em",
    backgroundColor: "#3f51b5"
  },
  online: {
    color: "green"
  },
  offline: {
    color: "#fff"
  },
});


export default function BasicTable({providers, handleAddProviderOpen, setCurrentId, handleDeleteProvider, setViewId, ...props}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead style={{backgroundColor: "#3f51b5", color: "#fff"}}>
          <TableRow>
            <TableCell align="left" rowSpan={1} className={classes.header}>Name</TableCell>
            <TableCell align="left" rowSpan={1} className={classes.header}>Active</TableCell>
            <TableCell align="left" rowSpan={1} className={classes.header}>Department</TableCell>
            <TableCell align="center"  className={classes.header}>Action<Divider></Divider><Button 
                variant="contained" 
                color="secondary" 
                onClick={handleAddProviderOpen}
                className={classes.spacingMargin}
                style={{marginTop: 10}}
              >
                Add Provider
              </Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((row) => (
            <TableRow key={row.provider_name}>
              <TableCell component="th" scope="row">
                {row.provider_name}
              </TableCell>
              <TableCell align="left"><span className={row.provider_active ? classes.online : classes.offline} style={{fontSize: "1.8em"}}>&#9679;</span> </TableCell>
              <TableCell align="left">{row.provider_department ? row.provider_department : "Not Mentioned"}</TableCell>
              <TableCell align="center">
                <Button 
                  className={classes.spacingMargin}
                  variant="contained" 
                  color="primary" 
                  onClick={() => {
                    setViewId(row.provider_id);
                  }}
                >
                  VIEW
                </Button>
                <Button 
                  className={classes.spacingMargin}
                  variant="contained" 
                  color="secondary" 
                  onClick={() => {
                    setCurrentId(row.provider_id);
                  }}
                >
                  EDIT
                </Button>
                <Button 
                  className={classes.spacingMargin}
                  variant="contained" 
                  color="default" 
                  onClick={() => handleDeleteProvider(row.provider_id)}
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
