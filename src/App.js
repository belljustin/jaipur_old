import React, { Component } from 'react';
import { Client } from 'boardgame.io/client';
import { CardDisplay } from './components/CardDisplay';
import { TokenDisplay } from './components/token.js';
import { MoveButton } from './components/MoveButton.js';
import { Jaipur } from './game';
import { Validation } from './validation';

class JaipurBoard extends Component {
  render() {
    let marketTable = [];
    let handTable = [];
    let p1Hand = this.props.G.players[0].hand;
    let p2Hand = this.props.G.players[1].hand;
    let market = this.props.G.market;
    let maxSize = p1Hand.length;
    if (p2Hand.length > maxSize) maxSize = p2Hand.length;
    else if (market.length > maxSize) maxSize = market.length;

    let marketCards = [];
    for (let i = 0; i < market.length; i++) {
      marketCards.push(
        <CardDisplay
          card={market[i]}
          key={market[i].id}
          onClick={() => this.props.moves.toggleMarketCard(i)}
        />);
    }
    marketTable.push(<tr key="market">{marketCards}</tr>);

    let hand = this.props.G.players[this.props.playerID].hand;
    let handCards = [];
    for (let i = 0; i < hand.length; i++) {
      handCards.push(
        <CardDisplay
          card={hand[i]}
          key={hand[i].id}
          onClick={() => this.props.moves.toggleHandCard(i)}
        />);
    }
    handTable.push(<tr key="hand">{handCards}</tr>);

    let tokenCells = [];
    let resourceNames = ['red', 'gold', 'silver', 'pink', 'green', 'brown'];
    let bonusNames = ['threes', 'fours', 'fives'];
    for (let i = 0; i < resourceNames.length; i++) {
      let key = resourceNames[i];
      tokenCells.push(<TokenDisplay tokenType={key} tokenValues={this.props.G.resourceTokens[key]} />)
    }
    for (let i = 0; i < bonusNames.length; i++) {
      let key = bonusNames[i];
      tokenCells.push(<TokenDisplay tokenType={key} tokenValues={this.props.G.bonusTokens[key]} hidden={true} />)
    }
    return (
      <div>
        <h1>Market</h1>
        <table id="market">
          <tbody>{marketTable}</tbody>
        </table>

        <h1>Hand</h1>
        <table id="hand">
          <tbody>{handTable}</tbody>
        </table>

        <h1>Tokens</h1>
        {tokenCells}

        <MoveButton disabled={!Validation.isValidPurchase(hand)} onClick={() => {this.props.moves.buyTokens(); this.props.events.endTurn();}} moveName='Buy Tokens' />
        <MoveButton disabled={!Validation.isValidSingle(hand, market)} onClick={() => {this.props.moves.pickUpSingle(); this.props.events.endTurn();}} moveName='Pick Up Single' />
        <MoveButton disabled={!Validation.isValidMultiple(hand, market)} onClick={() => {this.props.moves.pickUpMultiple(); this.props.events.endTurn();}} moveName='Pick Up Multiple' />
        <MoveButton disabled={!Validation.isValidSpecial(market)} onClick={() => {this.props.moves.pickUpSpecial(); this.props.events.endTurn();}} moveName='Pick Up Special' />
        <p> Player 0: {this.props.G.players[0].tokens.reduce((a, b) => a+b, 0)} Player 1: {this.props.G.players[1].tokens.reduce((a,b) => a+b, 0)} </p>
      </div>
    );
  }
}

const Application = Client({game:Jaipur, board:JaipurBoard, multiplayer:true})
export default Application;
