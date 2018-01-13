import React, { Component } from 'react';

export class TokenDisplay extends Component { 
  render() {
    return (
      <div> 
        <p> {this.props.tokenType}: { this.props.tokenValues.join(', ') }</p>
      </div>
    ); 
  }
}

