import React from 'react';
import PropTypes from 'prop-types';

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
      fontWeight: "normal"
    }

    if (this.card.selected === true) {
      cardStyle.fontWeight = "bold"
    }

    return (
      <div className={"bgio-card " + this.card.type + "-card"}
           onClick={this.onClick}
           style={cardStyle}>
      { this.card.type }
      </div>
    );
  }
}