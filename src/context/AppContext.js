import React, { Component } from 'react';

export const Context = React.createContext();

export class AppProvider extends Component {
  state = {
    age: "123",
    2: [30, 40],
    3: [15, 10]
  };

  render() {
    return (
      <Context.Provider value={{
        state: this.state
      }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}


