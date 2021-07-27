import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Table, TableContainer, TableBody, TableRow, TableCell, Typography, Divider, Chip, Button } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  spacingMargin: {
    marginLeft: 10,
    marginRight: 10,
  },
  spacingMarginChip: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  spacingMargin5: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
  },
  online: {
    color: "green"
  },
  offline: {
    color: "grey"
  },
  borderClass: {
    // border: "1px solid grey",
    // borderRadius: "5px",
  },
  width100: {
    width: "100%",
  },
  fixedWidthCell: { 
    width: "300px"
  },
});
const Provider = ({providerData, setViewId, setCurrentId, handleDeleteProvider, handleViewProviderClose, ...props}) => {
  const classes = useStyles();
  return (
    <Container style={{ width: "900px"}}>
      <p></p>
      <Divider></Divider>
      <TableContainer component={Paper} >
        <TableRow>
          <Container className={classes.spacingMargin5 + " " + classes.borderClass + " " + classes.width100}>
            <TableCell className={classes.spacingMargin} colSpan={2} align="center" style={{ width: "600px" }}>
              <Typography className={classes.spacingMargin5} variant='h3' color="secondary" align="center">
                {providerData.provider_name.toUpperCase()} 
                <span className={providerData.provider_active ? classes.online : classes.offline}>&#9679;</span> 
              </Typography>
            </TableCell>
          </Container>
        </TableRow>
        <TableRow className={classes.borderClass}>
          <Container className={classes.spacingMargin5 + " " + classes.borderClass + " " + classes.width100}>
            <TableCell className={classes.spacingMargin + " " + classes.fixedWidthCell}>
              <Typography variant='h5' color="textSecondary">
                <span className={classes.spacingMargin + " " + classes.offline}>Organisation</span>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h5' color="primary">
                {<span className={classes.spacingMargin}>{providerData.provider_organisation.org_name}</span>}
                {providerData.provider_organisation.org_location && <span className={classes.spacingMargin}>{providerData.provider_organisation.org_location}</span>}
                {providerData.provider_department && <span className={classes.spacingMargin + " " + classes.offline}>({providerData.provider_department})</span>}
              </Typography>
              <Typography variant='h6' color="textSecondary">
                <span className={classes.spacingMargin + " " + classes.offline}>{providerData.provider_organisation.org_address}</span>
              </Typography>
            </TableCell>
          </Container>
        </TableRow>
        <TableRow>
          <Container className={classes.spacingMargin5 + " " + classes.borderClass + " " + classes.width100}>
            <TableCell className={classes.spacingMargin + " " + classes.fixedWidthCell}>
              <Typography variant='h5' color="textSecondary">
                <span className={classes.spacingMargin + " " + classes.offline}>Phone(s)</span>
              </Typography>
            </TableCell>
            <TableCell>
              {providerData.provider_phones.map((phone, indx) => {
                return <Chip 
                  className={classes.spacingMarginChip}
                  label={phone.phone_country_code + "-" + phone.phone_number}
                  color="default"
                  key={indx}
                />
              })}
            </TableCell>
          </Container>
        </TableRow>
        <TableRow>
          <Container className={classes.spacingMargin5 + " " + classes.borderClass + " " + classes.width100}>
            <TableCell className={classes.spacingMargin + " " + classes.fixedWidthCell}>
              <Typography variant='h5' color="textSecondary">
                <span className={classes.spacingMargin + " " + classes.offline}>Qualification(s)</span>
              </Typography>
            </TableCell>
            <TableCell>
              {providerData.provider_qualifications.map((qualification, indx) => {
                return <Chip 
                  className={classes.spacingMarginChip}
                  label={qualification.qual_name}
                  color="secondary"
                  key={indx}
                />
              })}
            </TableCell>
          </Container>
        </TableRow>
        <TableRow>
          <Container className={classes.spacingMargin5 + " " + classes.borderClass + " " + classes.width100}>
            <TableCell className={classes.spacingMargin + " " + classes.fixedWidthCell}>
              <Typography variant='h5' color="textSecondary">
                <span className={classes.spacingMargin + " " + classes.offline}>Speciality(s)</span>
              </Typography>
            </TableCell>
            <TableCell>
              {providerData.provider_specialities.map((speciality, indx) => {
                return <Chip 
                  className={classes.spacingMarginChip}
                  label={speciality.spec_name}
                  color="primary"
                  key={indx}
                />
              })}
            </TableCell>
          </Container>
        </TableRow>
        <TableRow>
          <TableCell className={classes.spacingMargin} colSpan={2} align="center" style={{ width: "600px" }}>
            <Button 
              className={classes.spacingMargin}
              variant="contained" 
              color="primary" 
              onClick={() => {
                handleViewProviderClose()
              }}
            >
              BACK
            </Button>
            <Button 
              className={classes.spacingMargin}
              variant="contained" 
              color="secondary" 
              onClick={() => {
                setCurrentId(providerData.provider_id);
                handleViewProviderClose();
              }}
            >
              EDIT
            </Button>
            <Button 
              className={classes.spacingMargin}
              variant="contained" 
              color="default" 
              onClick={() => {
                handleViewProviderClose()
                handleDeleteProvider(providerData.provider_id)
              }}
            >
              DELETE
            </Button>
          </TableCell>
        </TableRow>
        
        <p></p>
      </TableContainer>
    </Container>
  )
}

export default Provider;