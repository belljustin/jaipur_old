import React, {Component} from 'react';

export class MoveButton extends Component {
  constructor(props) {
    super(props);
    this.moveName = this.props.moveName;
    this.onClick = this.props.onClick;
  }
  
  render() {
    return (
      <button type="button" onClick={this.onClick}>{this.props.moveName}</button>
    )
  }
}
