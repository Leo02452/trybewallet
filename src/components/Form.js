import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

const Alimentação = 'Alimentação';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      exchangeRates: {},
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { updateExpenses } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    this.setState((previousState) => ({
      id: previousState.id === '' ? 0 : previousState.id + 1,
      exchangeRates: {
        ...previousState.exchangeRates,
        ...data,
      },
    }), () => {
      updateExpenses({ ...this.state });
      this.setState({
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      });
    });
  }

  render() {
    const { currencies } = this.props;
    const { value,
      description,
    } = this.state;
    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency-input">
          Moeda
          <select
            type="text"
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            { currencies.map((currency, index) => (
              <option
                key={ index }
                value={ currency }
              >
                {currency}
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method-input">
          Pagamento
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="method-input">
          Categoria
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value={ Alimentação }>{Alimentação}</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte e Saúde">Transporte e Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
