import React, { Component } from 'react';

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
    return (
      <div> 
        <p> {this.props.tokenType}: { list.join(', ') }</p>
      </div>
    ); 
  }
}

