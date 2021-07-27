import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MainIcon from './MainIcon';
import Provider from './Provider';
import { Modal, Button, Container, Paper } from '@material-ui/core';
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

const validateData = (data) => {

}

export default function SearchAppBar() {
  const classes = useStyles();
  const [addProviderModal, setAddProviderModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [providers, setProviders] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(blankData);
  const [viewId, setViewId] = useState(null);
  const [viewProviderModal, setViewProviderModal] = useState(false);
  const [viewProviderData, setViewProviderData] = useState(null)
  const handleAddProviderOpen = () => {
    setAddProviderModal(true);
  }
  const handleAddProviderClose = () => {
    setAddProviderModal(false);
    setData(blankData);
    setCurrentId(null);
  }
  const handleViewProviderClose = () => {
    setViewProviderModal(false);
    setViewId(null);
  }
  const refreshPage = () => {
    setSearchString(prev => prev + " ");
    setSearchString(prev => prev.substr(0, prev.length - 1));
  }
  const handleSubmit = (e) => {
    try{
      e.preventDefault();
      validateData(data);
      const resBody = JSON.stringify(data);
      if(currentId) { // put request
        const url = `http://127.0.0.1:8000/api/providers/${currentId}`;
        axios.put(url, data)
        .then(function (response) {
          console.log(response);
          handleAddProviderClose();
          refreshPage();
        })
        .catch(function (error) {
          console.log(error);
        });
      } else { // post request
        const url = 'http://127.0.0.1:8000/api/providers/';
        axios.post(url, data)
        .then(function (response) {
          console.log(response);
          handleAddProviderClose();
          refreshPage();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    } catch(error) {
      console.log(error);
    }
  }
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchString(e.target.value);
  }
  const handleDeleteProvider = (providerId) => {
    const url = `http://127.0.0.1:8000/api/providers/${providerId}`;
    axios.delete(url)
    .then(function (response) {
      console.log(response);
      refreshPage();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(() => {
    console.log("triggered");
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
  useEffect(() => {
    if(currentId) {
      const url = `http://127.0.0.1:8000/api/providers/${currentId}`
      axios.get(url)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        handleAddProviderOpen();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [currentId])
  useEffect(() => {
    if(viewId) {
      const url = `http://127.0.0.1:8000/api/providers/${viewId}`;
      axios.get(url)
      .then(function (response) {
        console.log(response);
        setViewProviderData(response.data)
        setViewProviderModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {}
  }, [viewId])
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
          setCurrentId={setCurrentId}
          handleDeleteProvider={handleDeleteProvider}
          setViewId={setViewId}
        />
      </Container>
      <Container>
        <Modal
          className={classes.modalScroll}
          open={viewProviderModal}
          onClose={handleViewProviderClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Provider
            providerData={viewProviderData}
            setViewId={setViewId}
            setCurrentId={setCurrentId}
            handleDeleteProvider={handleDeleteProvider}
            handleViewProviderClose={handleViewProviderClose}
          />
        </Modal>
      </Container>
    </div>
  );
}