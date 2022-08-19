import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import withRouter from "../withRouter";
import Spinner from 'react-bootstrap/Spinner';

const CheckoutForm = (props) => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    console.log(props)

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements, redirect: 'if_required',
    });
    //"https://dashboard.stripe.com/test/payments/" + paymentIntentId

    console.log('result paymentIntentId')
    console.log(result)
    //props.GoToURLFn(event, '/')
    props.navigate('/success')

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <ul></ul>
      <h2> Total Price: {props.totalPrice} ₴</h2>
      <ul></ul>

      <center>

        <Button disabled={!stripe} variant="success" size='lg' type='submit'>
        
          Fetch Payment!
          
        </Button> 
        
        <ul></ul>
        {!stripe && <Spinner animation="border" variant="primary" />}
        
      </center>
      <ul></ul>
      test Card Number: 4242424242424242

    </form>
  )
};

//4242424242424242
export default withRouter(CheckoutForm);
//export default CheckoutForm;