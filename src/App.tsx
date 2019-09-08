import React from 'react';
import TaskView from './TaskView';
import Timer from './Timer';

import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Timer/>
      <TaskView/>
    </div>
  );
}

export default App;
