/**
 *
 * Main
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMain from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Main() {
  useInjectReducer({ key: 'main', reducer });
  useInjectSaga({ key: 'main', saga });

  return (
    <div>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Description of Main" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Main);
