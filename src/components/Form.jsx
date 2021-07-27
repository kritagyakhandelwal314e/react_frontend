import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper, Container, FormControlLabel, Switch, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// GET the current id of the post we click to edit

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  spacingMargin: {
    margin: 10,
  },
  container: {
    maxHeight: 740,
    overflow: "scroll",
  }
}));
const Form = ({currentId, handleSubmit, data, setData, blankData}) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(data);
  }, [data])

  const clear = () => {
    setData(blankData);
  }

  return (
    <Container >
      <Divider/>
      <p></p>
      <Paper
        className={classes.paper}
      >
        <form 
          autoComplete='off'
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant='h3' >{currentId ? 'Editing the Provider' : 'Creating a Provider'}</Typography>
          <Divider/>
          <TextField 
            name='ID' 
            variant='outlined' 
            label='ID' 
            fullWidth
            value={currentId}
            disabled
          />
          <Container>
            <Typography variant='h5' >Provider Details</Typography>
            <TextField 
              name='Name' 
              variant='outlined' 
              label='Name' 
              fullWidth
              value={data.provider_name}
              onChange={(e) => {
                setData(prev => ({...prev, provider_name: e.target.value}));
              }}
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={data.provider_active}
                  onChange={(e) => {
                    setData(prev => ({...prev, provider_active: e.target.checked}))
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Active?"
            />
            <TextField 
              name='Department' 
              variant='outlined' 
              label='Department' 
              fullWidth
              value={data.provider_department}
              onChange={(e) => {
                setData(prev => ({...prev, provider_department: e.target.value}));
              }}
            />
          </Container>
          <Divider/>
          <Container>
            <Typography variant='h5' >Qualification(s)</Typography>
            {data.provider_qualifications.map((qualification, indx) => {
              console.log(indx, qualification);
              return <TextField 
                key={`qual${indx}`}
                name={`qual${indx}`} 
                variant='outlined' 
                label={`Qualification ${indx + 1}`} 
                fullWidth
                value={data.provider_qualifications[indx].qual_name}
                onChange={(e) => {
                  setData(prev => {
                    console.log(prev);
                    const provider_qualifications = prev.provider_qualifications;
                    provider_qualifications[indx].qual_name = e.target.value;
                    return {...prev, provider_qualifications}
                  });
                }}
                required
              />
            })}
            <Button
              className={classes.spacingMargin}
              variant="contained"
              color="secondary"
              onClick={() => {
                setData(prev => {
                  console.log(prev);
                  const provider_qualifications = prev.provider_qualifications;
                  provider_qualifications.push({
                    qual_name: ''
                  });
                  return {...prev, provider_qualifications}
                });
              }}
            >add qualification</Button>
            <Button
              className={classes.spacingMargin}
              variant="contained"
              color="default"
              onClick={() => {
                setData(prev => {
                  console.log(prev);
                  const provider_qualifications = prev.provider_qualifications;
                  if(provider_qualifications.length > 1)
                    provider_qualifications.pop();
                  return {...prev, provider_qualifications}
                });
              }}
            >Remove Qualification</Button>
          </Container>
          <Divider/>
          <Container>
            <Typography variant='h5' >Speciality(s)</Typography>
            {data.provider_specialities.map((speciality, indx) => {
              console.log(indx, speciality);
              return <TextField 
                key={`spec${indx}`}
                name={`spec${indx}`} 
                variant='outlined' 
                label={`Speciality ${indx + 1}`} 
                fullWidth
                value={data.provider_specialities[indx].spec_name}
                onChange={(e) => {
                  setData(prev => {
                    console.log(prev);
                    const provider_specialities = prev.provider_specialities;
                    provider_specialities[indx].spec_name = e.target.value;
                    return {...prev, provider_specialities}
                  });
                }}
                required
              />
            })}
            <Button
              className={classes.spacingMargin}
              variant="contained"
              color="secondary"
              onClick={() => {
                setData(prev => {
                  console.log(prev);
                  const provider_specialities = prev.provider_specialities;
                  provider_specialities.push({
                    spec_name: ''
                  });
                  return {...prev, provider_specialities}
                });
              }}
            >add speciality</Button>
            <Button
              className={classes.spacingMargin}
              variant="contained"
              color="default"
              onClick={() => {
                setData(prev => {
                  console.log(prev);
                  const provider_specialities = prev.provider_specialities;
                  if(provider_specialities.length > 1)
                    provider_specialities.pop();
                  return {...prev, provider_specialities}
                });
              }}
            >Remove speciality</Button>
          </Container>
          <Divider/>
          <Container>
            <Typography variant='h5' >Phone(s)</Typography>
            {data.provider_phones.map((phone, indx) => {
              console.log(indx, phone);
              return <Container key={`phone${indx}`}>
                <Typography variant='h6' >Phone {indx + 1}</Typography>
                <TextField 
                  name={`phone_country_code${indx}`} 
                  variant='outlined' 
                  label={`country code`} 
                  value={data.provider_phones[indx].phone_country_code}
                  onChange={(e) => {
                    setData(prev => {
                      console.log(prev);
                      const provider_phones = prev.provider_phones;
                      provider_phones[indx].phone_country_code = e.target.value;
                      return {...prev, provider_phones}
                    });
                  }}
                  required
                />
                <TextField 
                  name={`phone_number${indx}`} 
                  variant='outlined' 
                  label={`Number`} 
                  value={data.provider_phones[indx].phone_number}
                  onChange={(e) => {
                    setData(prev => {
                      console.log(prev);
                      const provider_phones = prev.provider_phones;
                      provider_phones[indx].phone_number = e.target.value;
                      return {...prev, provider_phones}
                    });
                  }}
                  required
                />
              </Container>
            })}
            <Button
              className={classes.spacingMargin}
              variant="contained"
              color="secondary"
              onClick={() => {
                setData(prev => {
                  console.log(prev);
                  const provider_phones = prev.provider_phones;
                  provider_phones.push({
                    qual_name: ''
                  });
                  return {...prev, provider_phones}
                });
              }}
            >add phone</Button>
            <Button
              className={classes.spacingMargin}
              variant="contained"
              color="default"
              onClick={() => {
                setData(prev => {
                  console.log(prev);
                  const provider_phones = prev.provider_phones;
                  if(provider_phones.length > 1)
                    provider_phones.pop();
                  return {...prev, provider_phones}
                });
              }}
            >Remove phone</Button>
          </Container>
          <Divider/>
          <Container>
            <Typography variant='h5' >Organisation Details</Typography>
            <TextField 
              name='organisation name' 
              variant='outlined' 
              label='organisation name' 
              fullWidth
              value={data.provider_organisation.org_name}
              onChange={(e) => {
                setData(prev => {
                  const provider_organisation = prev.provider_organisation
                  provider_organisation.org_name = e.target.value;
                  return {...prev, provider_organisation}
                });
              }}
              required
            />
            <TextField 
              name='organisation location' 
              variant='outlined' 
              label='organisation location' 
              fullWidth
              value={data.provider_organisation.org_location}
              onChange={(e) => {
                setData(prev => {
                  const provider_organisation = prev.provider_organisation
                  provider_organisation.org_location = e.target.value;
                  return {...prev, provider_organisation}
                });
              }}
            />
            <TextField 
              name='organisation address' 
              variant='outlined' 
              label='organisation address' 
              fullWidth
              value={data.provider_organisation.org_address}
              onChange={(e) => {
                setData(prev => {
                  const provider_organisation = prev.provider_organisation
                  provider_organisation.org_address = e.target.value;
                  return {...prev, provider_organisation}
                });
              }}
              required
            />
          </Container>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >Submit</Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >Clear</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Form