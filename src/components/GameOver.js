import React from 'react';
import PropTypes from 'prop-types';

export class GameOver extends React.Component {
  static propTypes = {
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    score: PropTypes.number,
    oppScore: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.score = props.score;
    this.oppScore = props.oppScore;
  }

  onClick = () => {
    this.props.onClick();
  }

  render() {
    return (
    <div class="modal-wrapper">
      <div class="modal">
        <h1>Game Over</h1>
          <p>You: {this.score}</p>
          <p>Opponent: {this.oppScore}</p>
          <button
            type="button"
            onClick={this.onClick}>
              Replay?
          </button>
      </div>
    </div>
    );
  }
}
