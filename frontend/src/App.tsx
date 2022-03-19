import React from 'react';
import { Link } from 'react-router-dom';

// MUI imports
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Box } from '@mui/material';
import { Button } from '@mui/material';

import './App.css';

// import { API } from '././API';

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    name: data.get('name'),
    description: data.get('description'),
    end_date: data.get('end_date'),
  });
};


function App() {
  // let test = API.test().then(res => res);

  return (
    <div className="App">
      <Typography variant="h2" component="h1">
        CREATE NEW POLLS
      </Typography>
      <Typography variant="h5" component="h1" mt={5}>
        Fill in the blanks, Share the link!
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate >
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12}>
            <TextField 
            variant="outlined" 
            label="Give Your Poll A Name"
            id="name"
            name="name"
            autoComplete='off'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            variant="outlined" 
            label="Describe Your Poll"
            id="description"
            name="description"
            autoComplete='off'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            type="date" 
            label="End Date"
            id="end_date"
            name="end_date"
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button 
            type="submit"
            fullWidth
            variant="contained"
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
