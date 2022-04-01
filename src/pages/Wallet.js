import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import { getCoinPrice } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount = () => {
    const { getCoinInfo } = this.props;
    getCoinInfo();
  }

  render() {
    return (
      <>
        <Header />
        <Form />
      </>
    );
  }
}

Wallet.propTypes = {
  getCoinInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCoinInfo: () => dispatch(getCoinPrice()),
});

export default connect(null, mapDispatchToProps)(Wallet);
