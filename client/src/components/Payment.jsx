import React from 'react';
import Header from './Header';
import { BasicDropdown } from './BasicDropdown';
import PaymentLink from './PaymentLink';
import Spinner from './Spinner';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      market: 'SE',
      locale: 'en_US'
    };
  }

  componentDidMount() {
    this.getData("red-cross")
      .then(res => this.setState({paymentRequest: res.response}))
      .catch(err => console.log(err));
  }

  onSelectMarket(value) {
    this.setState({market: value});
  }

  onSelectLocale(value) {
    this.setState({locale: value});
  }

  getData = async (institution) => {
    const response = await fetch('/pay', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({institution: institution}),
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    const {
      locale,
      market,
      paymentRequest
    } = this.state;
    return (
      <div>
        <Header text="Hello!" emoji="money" />

        <p>We can help you pay for your purchase.</p>
        <p>
          Or actually we can’t. We’re just a simple example app.
          But you can donate to the Red Cross.
        </p>

        <div style={{padding: '50px 0 10px 0'}}>
          <BasicDropdown
            name="Choose a market" items={['AT', 'BE', 'DE', 'DK', 'ES', 'FI', 'GB', 'NO', 'SE']}
            onSelect={(value) => this.onSelectMarket(value)} style={{marginBottom: '30px'}}
          />
        </div>

        <div style={{padding: '10px 0 50px 0'}}>
          <BasicDropdown
            name="Choose a locale" items={['en_US', 'sv_SE', 'da_DK', 'no_NO', 'fi_FI']}
            onSelect={(value) => this.onSelectLocale(value)} style={{marginBottom: '30px'}}
          />
        </div>

        { paymentRequest &&
          <PaymentLink hr
            scope="accounts:read,transactions:read,investments:read,user:read"
            market={market}
            locale={locale}
            paymentRequestId={paymentRequest.id}
          />
        }

        { !paymentRequest && <Spinner width='50px' image={'./spinner.png'} /> }
      </div>
    );
  }
}
