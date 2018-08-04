import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/TspCanvas.css';

export default class TspCanvas extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    const { data } = this.props;
    // console.log(data);
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(223, 240, 224)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (data.length > 0) {
      this.drawPoints(ctx, data);
      this.drawPath(ctx, data);
    }
  }

  static drawPoint(ctx, point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#f04e44';
    ctx.fill();
    ctx.closePath();
  }

  static drawPath(ctx, arr) {
    ctx.strokeStyle = 'rgba(240,10,10,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(arr[0].x, arr[0].y);
    arr.map((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(arr[0].x, arr[0].y);
    ctx.stroke();
    ctx.closePath();
  }

  drawPoints(ctx, arr) {
    arr.map((point) => {
      this.drawPoint(ctx, point);
    });
  }

  render() {
    return <canvas ref={this.canvasRef} className="TspCanvas" />;
  }
}

TspCanvas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })).isRequired,
};
