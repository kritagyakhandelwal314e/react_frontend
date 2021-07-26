import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MainIcon from './MainIcon';
import { Modal, Button, Container } from '@material-ui/core';
import axios from 'axios';
import BasicTable from './DataTable';
import Form from './Form';
const blankData = {
  provider_name: '',
  provider_active: true,
  provider_department: '',
  provider_qualifications: [
    {
      qual_name: ''
    }
  ],
  provider_specialities: [
    {
      spec_name: ''
    }
  ],
  provider_phones: [
    {
      phone_country_code: '',
      phone_number: ''
    }
  ],
  provider_organisation: {
    org_name: '',
    org_location: '',
    org_address: ''
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  modalScroll:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block'
  }
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [addProviderModal, setAddProviderModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [providers, setProviders] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(blankData);
  const handleAddProviderOpen = () => {
    setAddProviderModal(true);
  }
  const handleAddProviderClose = () => {
    setAddProviderModal(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const resBody = JSON.stringify(data);
    if(currentId) { // put request

    } else { // post request

    }
    // clear();
  }
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchString(e.target.value);
  }
  useEffect(() => {
    const fetchProviders = async (url) => {
      const response = await fetch(url);
      setProviders(await response.json())
      // console.log(providers);
    }
    let queryString = '';
    let url = 'http://127.0.0.1:8000/api/providers';
    if(searchString) {
      queryString += 'search_string=' + searchString;
      url += '/search?' + queryString
    }
    fetchProviders(url)
    // console.log(providers);
  }, [searchString])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MainIcon/>
          </IconButton>
          <Typography className={classes.title} variant="h4" noWrap>
            Healthcare Providers
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchString}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <p></p>
      <Container>
        <Modal
          className={classes.modalScroll}
          open={addProviderModal}
          onClose={handleAddProviderClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          width="80%"
        >
          <Form 
            currentId={currentId}
            handleSubmit={handleSubmit}
            data={data}
            setData={setData}
            blankData={blankData}
          />
        </Modal>
        <BasicTable 
          providers = {providers}
          handleAddProviderOpen = {handleAddProviderOpen}
        />
      </Container>
    </div>
  );
}