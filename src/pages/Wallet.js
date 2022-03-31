import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
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
    return <Header />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCoinInfo: () => dispatch(getCoinPrice()),
});

export default connect(null, mapDispatchToProps)(Wallet);
