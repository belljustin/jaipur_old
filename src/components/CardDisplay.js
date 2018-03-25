import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export class CardDisplay extends React.Component {
  static propTypes = {
    onHover: PropTypes.func,
    onClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.card = props.card;
  }

  onClick = () => {
    this.props.onClick();
  }

  render() {
    let cardStyle = {
      background: this.card.type
    }
    
    let styleName = "card";
    if (this.props.card.selected === true) {
      styleName = "card-selected";
    }

    return (
      <td className={styleName}
           onClick={this.onClick}
           style={cardStyle} >
      { this.card.type }
      </td>
    );
  }
}
