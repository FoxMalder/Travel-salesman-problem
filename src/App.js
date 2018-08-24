import React, { Component } from 'react';
import Sidebar from './containers/Sidebar';
import TspCanvas from './components/TspCanvas';
import Chart from './components/Chart';
import { randomPoint, isNumeric } from './utils/utils';
import ErrorBoundary from './components/ErrorBoundary';
import anneal from './utils/anneal';

import './css/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      bestPathLengthArr: [],
      bestPathLength: 0,
      temp: '',
      tempArr: [],
      tempIsEmpty: true,
      btnIsDisabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    const { tempIsEmpty } = this.state;
    let newState = [];
    for (let i = 0; i < 20; i += 1) {
      newState = newState.concat(randomPoint());
    }
    this.setState({
      cities: newState,
    });
    !tempIsEmpty ? this.setState({ btnIsDisabled: false }) : this.setState({ btnIsDisabled: true });
  }

  handleClickStart() {
    const { cities, temp } = this.state;
    const bestSol = anneal(cities, temp);
    const bestPath = bestSol[0];
    const bestPathLengthArr = bestSol[1];
    const bestPathLength = bestSol[2];
    const tempArr = bestSol[3];
    this.setState({
      cities: bestPath,
      bestPathLengthArr,
      bestPathLength,
      tempArr,
    });
  }

  handleInputChange(e) {
    if (isNumeric(e)) {
      this.setState({
        temp: e,
        tempIsEmpty: false,
      });
    } else {
      this.setState({
        temp: '',
        tempIsEmpty: true,
      });
    }
  }

  render() {
    const {
      cities,
      bestPathLengthArr,
      bestPathLength,
      tempArr,
      tempIsEmpty,
      btnIsDisabled,
    } = this.state;
    return (
      <div className="App">
        <ErrorBoundary>
          <Sidebar
            data={bestPathLength}
            tempIsEmpty={tempIsEmpty}
            btnIsDisabled={btnIsDisabled}
            onClickRandomPoints={this.handleClick}
            onClickStart={this.handleClickStart}
            onInputChange={this.handleInputChange}
          />
          <div className="App__Canvas">
            <TspCanvas data={cities} />
            <div className="App__Charts">
              <Chart data={bestPathLengthArr} dataKey="solution">
                Solution Chart
              </Chart>
              <Chart data={tempArr} dataKey="temperature">
                Temperature Chart
              </Chart>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
