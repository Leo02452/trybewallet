import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editModeOn } from '../actions';

class Table extends Component {
  handleDelete = ({ target }) => {
    const { expenses, dispatchDeleteExpenses } = this.props;
    const newArray = expenses.filter((element) => element.id !== +target.value);
    dispatchDeleteExpenses(newArray);
  }

  handleEdit = ({ target }) => {
    const { expenses, dispatchEditModeOn } = this.props;
    const expense = expenses.filter((element) => element.id === +target.value);
    dispatchEditModeOn(...expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                { (Number(expense.value)
                  * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ this.handleEdit }
                  value={ expense.id }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.handleDelete }
                  value={ expense.id }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatchDeleteExpenses: PropTypes.func.isRequired,
  // dispatchEditExpenses: PropTypes.func.isRequired,
  dispatchEditModeOn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpenses: (expense) => dispatch(deleteExpense(expense)),
  // dispatchEditExpenses: (expense) => dispatch(editExpense(expense)),
  dispatchEditModeOn: (expense) => dispatch(editModeOn(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
