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
      fontWeight: "normal",
      background: this.card.type
    }

    if (this.props.card.selected === true) {
      cardStyle.fontWeight = "bold";
      cardStyle.width = "132px";
      cardStyle.height = "185px";
    } else {
      cardStyle.fontWeight = "normal";
      cardStyle.width = "120px";
      cardStyle.height = "168px";
    }

    return (
      <td className={"card"}
           onClick={this.onClick}
           style={cardStyle}>
      { this.card.type }
      </td>
    );
  }
}
