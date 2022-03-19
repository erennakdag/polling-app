import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MUI imports
import { Typography, TextField, Grid, Box, Button } from '@mui/material';

import './App.css';

function handleSubmit(event: React.FormEvent<HTMLFormElement>, optionCount: number) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const postData = {
    name: data.get('name'),
    description: data.get('description'),
    end_date: data.get('end_date'),
  };
  const options: string[] = [];
  for (let i = 0; i < optionCount; i++) {
    options.push(data.get(`option${i}`)?.toString() || '');
  }
  console.log(postData);
  console.log(options);
};


function App() {
  // let test = API.test().then(res => res);
  const [ optionCount, setOptionCount ] = useState(0);
  console.log(optionCount);

  return (
    <div className="App">
      <Typography variant="h2" component="h1" mt={5}>
        CREATE NEW POLLS
      </Typography>
      <Typography variant="h5" component="h1" mt={5}>
        Fill in the blanks, Share the link!
      </Typography>
      <Box component="form" onSubmit={
          (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e, optionCount)} noValidate sx={{textAlign: 'left'}
        }>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12}>
            <TextField
            variant="outlined"
            label="Give Your Poll A Name"
            id="name"
            name="name"
            autoComplete='off'
            required
            sx={{width: '25%'}}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
            variant="outlined"
            label="Describe Your Poll"
            id="description"
            name="description"
            autoComplete='off'
            fullWidth
            required
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
            type="date"
            label="End Date"
            id="end_date"
            name="end_date"
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{width: '25%'}}
          ></TextField>
          </Grid>
          <div style={{width: "100%"}}>
            {Array.from({ length: optionCount }).map((_,id) => (
                <Grid key={id} item xs={12}>
                  <TextField
                  variant="outlined"
                  label={`Option ${id}`}
                  id={`option${id}`}
                  name={`option${id}`}
                  autoComplete='off'
                  required
                  sx={{width: '25%'}}
                  />
                </Grid>
            ))}
          </div>
          <Grid item xs={12}>
            <Button 
            variant='contained'
            onClick={(e) => {
              setOptionCount(optionCount + 1);
            }}
            sx={{width: '25%'}}
            >
              Add Option
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
            type="submit"
            variant="contained"
            sx={{width: '25%'}}
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
