import React from 'react';
import TaskView from './TaskView';
import Timer from './Timer';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Tasks</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Time</a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <TaskView/>
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <Timer/>
        </div>
      </div>
    </div>
  );
}

export default App;
