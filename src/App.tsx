import React from 'react';

import { ThemeProvider } from 'emotion-theming';
import theme from './theme';
import {Box} from 'rebass'

import TaskView from './TaskView';
import './App.scss';
import TimerView from './TimerView';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        bg='background'
        sx={{
          maxWidth: 512,
          mx: 'auto',
          px: 3,
        }}>
        <TimerView/>
        <TaskView/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
