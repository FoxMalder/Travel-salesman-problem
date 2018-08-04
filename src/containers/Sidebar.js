import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from 'arui-feather/heading';
import Input from 'arui-feather/input';
import Label from 'arui-feather/label';
import Button from 'arui-feather/button';

import '../css/Sidebar.css';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };

    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleGenerateClick() {
    try {
      this.props.onClickRandomPoints();
    } catch (error) {
      this.setState({ error });
    }
  }

  handleStartClick() {
    try {
      this.props.onClickStart();
    } catch (error) {
      this.setState({ error });
    }
  }

  handleInputChange(e) {
    try {
      this.props.onInputChange(e);
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { data, tempIsEmpty, btnIsDisabled } = this.props;
    const { error } = this.state;
    if (error) {
      return (
        <h4>
          Caught an error.
        </h4>
      );
    }
    return (
      <div className="Sidebar">
        <div className="Sidebar__content">
          <Heading size="m">
            Parametres
          </Heading>
          <Label>
            Initial temperature:
          </Label>
          <Input
            className="Sidebar__Input"
            type="number"
            placeholder="100"
            view="line"
            pattern="[0-9]{3}"
            maxlength="3"
            title="Numbers only"
            onChange={this.handleInputChange}
            required
          />
          <Label>
            Generate 10 cities
          </Label>
          <div className="Sidebar__Group">
            <Button
              view="extra"
              size="m"
              className="Sidebar__Button"
              disabled={tempIsEmpty}
              onClick={this.handleGenerateClick}
            >
              Generate
            </Button>
            <Button
              view="extra"
              size="m"
              className="Sidebar__Button"
              disabled={btnIsDisabled}
              onClick={this.handleStartClick}
            >
              Start
            </Button>
          </div>
          <p>
            Best solution:
          </p>
          <p>
            { data }
          </p>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  onClickRandomPoints: PropTypes.func.isRequired,
  onClickStart: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  tempIsEmpty: PropTypes.bool.isRequired,
  btnIsDisabled: PropTypes.bool.isRequired,
  data: PropTypes.number.isRequired,
};
