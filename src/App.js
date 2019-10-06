import React from 'react';
import logo from './logo.svg';
import './App.scss';
import SideNAV from './components/SideNAV'

function App() {
  return (
    <div className="App">
      <div className="columns">
        <div className="column is-one-fifth">
          <SideNAV />
        </div>
        <div className="column">
          <table className="table">
            <thead>
              <tr>
                <th> Email </th>
                <th> Name </th>
                <th> Status</th>
                <th> Email </th>
              </tr>

            </thead>
            <tbody>
              <tr>
                
                <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
                <td>38</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default App;
