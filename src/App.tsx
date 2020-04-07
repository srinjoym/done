import React from 'react';

import { ThemeProvider, ColorModeProvider, Box, CSSReset } from '@chakra-ui/core'
import TaskView from './TaskView';
import './App.scss';
import TimerView from './TimerView';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Box display="flex" flexDirection="column" height="100%">
          <TimerView/>
          <Box flexGrow={1} overflow="hidden">
            <TaskView/>
          </Box>
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
