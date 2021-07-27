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
import { Modal, Button, Container, InputLabel, FormControl, Select, MenuItem, Box, Divider } from '@material-ui/core';
import axios from 'axios';
import BasicTable from './DataTable';
import Form from './Form';
import Toast from './Toast';
// const blankData = {
//   provider_name: '',
//   provider_active: true,
//   provider_department: '',
//   provider_qualifications: [
//     {
//       qual_name: ''
//     }
//   ],
//   provider_specialities: [
//     {
//       spec_name: ''
//     }
//   ],
//   provider_phones: [
//     {
//       phone_country_code: '',
//       phone_number: ''
//     }
//   ],
//   provider_organisation: {
//     org_name: '',
//     org_location: '',
//     org_address: ''
//   }
// }
const blankData = {
  provider_name: 'lolololol',
  provider_active: true,
  provider_department: 'lolololol',
  provider_qualifications: [
    {
      qual_name: 'lololololol'
    }
  ],
  provider_specialities: [
    {
      spec_name: 'lololololol'
    }
  ],
  provider_phones: [
    {
      phone_country_code: '+11',
      phone_number: '1111111111'
    }
  ],
  provider_organisation: {
    org_name: 'lolololol',
    org_location: 'lolololol',
    org_address: 'lolololol'
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
  },
  spacingMargin: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

const validateData = (data) => {
  if(data.provider_name.length < 3 || data.provider_name.length > 64) {
    throw Error('Name Field should be of length 3 to 64 chararcters only.');
  }
  if(!(data.provider_active === true || data.provider_active === false)) {
    throw Error('Active Field should be either true or false.');
  }
  if(data.provider_qualifications.length < 1) {
    throw Error('Qualifications Field should have atleast 1 qualification.');
  }
  data.provider_qualifications.map((qualification, indx) => {
    if(qualification.qual_name.length < 2 || qualification.qual_name.length > 64) {
      throw Error(`Qualifications ${indx + 1} Field should be of length 2 to 64 chararcters only.`);
    }
  })
  if(data.provider_specialities.length < 1) {
    throw Error('Speciality Field should have atleast 1 Speciality.');
  }
  data.provider_specialities.map((speciality, indx) => {
    if(speciality.spec_name.length < 2 || speciality.spec_name.length > 64) {
      throw Error(`Speciality ${indx + 1} Field should be of length 2 to 64 chararcters only.`);
    }
  })
  if(data.provider_phones.length < 1) {
    throw Error('Phones Field should have atleast 1 Phone.');
  }
  data.provider_phones.map((phone, indx) => {
    if(phone.phone_country_code.length !== 3 || phone.phone_country_code.match(/d\+[0-9][0-9]/i)) {
      throw Error(`Phone Country Code Field is NOT Valid.`);
    }
    if( (phone.phone_number.length < 8 || phone.phone_number.length > 10 ) || phone.phone_country_code.match(/[0-9]{8,10}/i)) {
      throw Error(`Phone Number Field is NOT Valid.`);
    }
  })
  if(data.provider_department.length > 65) {
    throw Error('Department Field should be of length less than 64 characters');
  }
  if(data.provider_organisation.org_name.length < 3 || data.provider_organisation.org_name.length > 64) {
    throw Error(`Organisation Name Field should be of length 3 to 64 chararcters only.`);
  }
  if(data.provider_organisation.org_address.length < 3 || data.provider_organisation.org_address.length > 64) {
    throw Error(`Organisation Address Field should be of length 3 to 256 chararcters only.`);
  }
  if(data.provider_organisation.org_location.length > 64) {
    throw Error(`Organisation Location Field should be of length less than 64 chararcters.`);
  }
}

export default function SearchAppBar() {
  const classes = useStyles();
  const [addProviderModal, setAddProviderModal] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [providers, setProviders] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(blankData);
  const [viewId, setViewId] = useState(null);
  const [viewProviderModal, setViewProviderModal] = useState(false);
  const [viewProviderData, setViewProviderData] = useState(null)
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [toastMessage, setToastMessage] = useState("Welcome");
  const [toastSeverity, setToastSeverity] = useState('info');
  const [toast, setToast] = useState(false);
  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  }
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
          setToastMessage("Successfully Updated");
          setToastSeverity("success")
        })
        .catch(function (error) {
          console.log(error);
          setToastMessage(error.message);
          setToastSeverity("error")
        });
      } else { // post request
        const url = 'http://127.0.0.1:8000/api/providers/';
        axios.post(url, data)
        .then(function (response) {
          console.log(response);
          handleAddProviderClose();
          refreshPage();
          setToastMessage("Successfully Added");
          setToastSeverity("success")
        })
        .catch(function (error) {
          console.log(error);
          setToastMessage(error.message);
          setToastSeverity("error");
        });
      }
    } catch(error) {
      setToastMessage(error.message);
      setToastSeverity("error");
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
      setToastMessage("Successfully Deleted");
      setToastSeverity("success");
      console.log("hello");
      refreshPage();
    })
    .catch(function (error) {
      setToastMessage(error.message);
      setToastSeverity("error")
      console.log(error);
    });
  }
  useEffect(() => {
    console.log("triggered");
    const fetchProviders = async (url) => {
      axios.get(url)
      .then(function (response) {
        // handle success
        setProviders(response.data);
      })
      .catch(function (error) {
        // handle error
        setToastMessage("Server error while fetching data");
        setToastSeverity("error");
      });
    }
    let queryString = '';
    let url = 'http://127.0.0.1:8000/api/providers?';
    if(searchString) {
      queryString += 'search_string=' + searchString;
      url = url.substr(0, url.length - 1);
      url += '/search?' + queryString;
    }
    url += '&pg_num=' + pageNum;
    url += '&pg_size=' + pageSize;
    fetchProviders(url);
  }, [searchString, pageNum, pageSize])
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
        setToastMessage(error.message);
        setToastSeverity("error")
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
        setToastMessage(error.message);
        setToastSeverity("error")
      });
    }
  }, [viewId])
  useEffect(() => {
    setToast(true);
  }, [toastMessage, toastSeverity])
  return (
    <div className={classes.root}>
      {toastMessage && <Toast 
        message={toastMessage} 
        setMessage={setToastMessage}
        severity={toastSeverity}
        open={toast}
        setOpen={setToast}
      />}
      <AppBar position="fixed">
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
      <Container style={{marginTop: "7em"}}>
        <Modal
          className={classes.modalScroll}
          open={addProviderModal}
          onClose={handleAddProviderClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {/* <Toast 
            message={toastMessage} 
            severity={toastSeverity}
            open={toast}
            setOpen={setToast}
          /> */}
          <Form 
            currentId={currentId}
            handleSubmit={handleSubmit}
            data={data}
            setData={setData}
            blankData={blankData}
          />
        </Modal>
        <div>
          <Box display="flex" p={1}>
            <Box flexGrow={1} p={1}>
              <FormControl className={classes.formControl} style={{ width: "100px"}}>
                <InputLabel id="demo-simple-select-label" >Page Size: </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="flex-end" p={1}>
              <div display="flex" alignSelf="flex-start" p={1}>
              <Typography color="textSecondary" variant="caption" noWrap={true}>{`Page Number`} </Typography>
              <Typography>{pageNum}</Typography>
              </div>
            </Box>
            <Box display="flex" p={1} justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                className={classes.spacingMargin}
                onClick={() => {
                  setPageNum(prev => Math.max(1, prev - 1))
                }}
              >{"<"}</Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.spacingMargin}
                onClick={() => {
                  setPageNum(prev => prev + 1)
                }}
              >{">"}</Button>
            </Box>
          </Box>
        </div>
        <p></p>
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
          {/* <Toast 
            message={toastMessage} 
            severity={toastSeverity}
            open={toast}
            setOpen={setToast}
          /> */}
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