import React, { Component } from 'react';
import './styles.css';

export class TokenDisplay extends Component { 
  render() {
    let list = [];
    for (let i = 0; i < this.props.tokenValues.length; i++) {
      if (this.props.hidden) {
        list.push('?');
      } else {
        list.push(this.props.tokenValues[i]);
      }
    }
    let color = { background: this.props.tokenType };
    if (this.props.hidden) {
      color = { background: 'black'}
    }
    return (
      <div> 
      <p class='tokenTitle'>{this.props.tokenType}</p>{list.map(function(value){ return <div class='circle' style={color}>{value}</div>;})}
      </div>
    );
  }
}

