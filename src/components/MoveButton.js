import React, {Component} from 'react';
import './styles.css';

export class MoveButton extends Component {
  constructor(props) {
    super(props);
    this.moveName = this.props.moveName;
    this.onClick = this.props.onClick;
  }
  
  render() {
    return (
      <button class="moveButton" type="button" disabled={this.props.disabled} onClick={this.onClick}>{this.props.moveName}</button>
    )
  }
}
