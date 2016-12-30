import React from 'react';
import ReactDOM from 'react-dom';

import Currencies from './currencies';


class Widget extends React.Component {
  constructor(){
    super();

    this.state = {baseCurrency: "EUR", rates: {}, amount: ""};
    this.fetchRates();
    this.setAmount = this.setAmount.bind(this);
  }

  // componentWillMount() {debugger;}
  // componentDidMount() {debugger;}
  //
  // componentWillUpdate() {debugger;}
  // componentDidUpdate() {debugger;}

  setBaseCurrency(currency){
    this.setState({baseCurrency: currency}, this.fetchRates);

  }

  fetchRates(){
    console.log(this.state.baseCurrency);
    $.ajax({
      method: "GET",
      url: `http://api.fixer.io/latest?base=${this.state.baseCurrency}`
    }).then((response) => this.setState({rates: response.rates}));
  }

  setAmount(e) {
   const amount = e.target.value ? parseInt(e.target.value) : "";
   this.setState({ amount }, this.fetchRates);
  }

  render(){
    console.log('in render');
    const currencies = ["CNY", "GBP", "JPY", "CAD", "EUR", "USD"];
    let currencyDivs = currencies.map((currency, idx) => (
      <li key={`${currency}`+idx}
        onClick={this.setBaseCurrency.bind(this, currency)}>
        {currency}
      </li>
    ));

    return (
      <div>

        <h1>Currency Exchange Rates</h1>
        <input onChange={this.setAmount} value={this.state.amount}/>Amount
        <h3>Base Currency: {this.state.baseCurrency}</h3>
        <div>
          Get Rates:
        </div>
        <ul>
          {currencyDivs}
        </ul>
        < Currencies rates={this.state.rates} amount={this.state.amount}/>
      </div>
    );
  }
}

export default Widget;
