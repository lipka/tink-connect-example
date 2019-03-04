import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const PaymentLink = ({
  locale,
  market,
  scope,
  paymentRequestId,
}) => {
  const link = 'https://oauth.tink.com/0.4/pay/?' +
    'client_id=' + process.env.REACT_APP_CLIENT_ID +
    '&redirect_uri=http://localhost:3000/callback' +
    '&scope=' + scope +
    '&grant_type=authorization_code' +
    '&market=' + market +
    '&locale=' + locale +
    '&payment_request_id=' + paymentRequestId;

  return (
    <Button href={link}>Pay</Button>
  );
};

PaymentLink.propTypes = {
  locale: PropTypes.string.isRequired,
  market: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  paymentRequestId: PropTypes.string.isRequired
};

export default PaymentLink;
