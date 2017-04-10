$( document ).ready(function() {
    
	var stripe   = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	var elements = stripe.elements();

});


var card = elements.create('card', {
	hidePostalCode: true,
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});
card.mount('#card-element');


function setOutcome(result) {


  // var successElement = document.querySelector('.success');
  var successElement = $('.success');

  // var errorElement = document.querySelector('.error');
  var errorElement = $('.error');

  successElement.removeClass('visible');
  errorElement.removeClass('visible');

  // successElement.classList.remove('visible');
  // errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    successElement.find('.token').html( result.token.id );
    // successElement.querySelector('.token').textContent = result.token.id;
    // successElement.classList.add('visible');
    successElement.addClass('visible');

  } else if (result.error) {

  	errorElement.html( result.error.message );
    // errorElement.textContent = result.error.message;
    console.log( result );
    errorElement.addClass('visible');
    // errorElement.classList.add('visible');

  }
}

card.on('change', function(event) {
  setOutcome(event);
});


$('#payment-form').submit(function(e){

	e.preventDefault();
	var form = this;
	var extraDetails = {
	    name: form.find('input[name=cardholder-name]').prop(),
	};
	console.log( extraDetails );

		stripe.createToken(card, extraDetails).then(setOutcome);				

});

// document.querySelector('form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   var form = document.querySelector('form');
//   var extraDetails = {
//     name: form.querySelector('input[name=cardholder-name]').value,
//   };
//   stripe.createToken(card, extraDetails).then(setOutcome);
// });


// var form = document.getElementById('payment-form')

// var form = $('#payment-form');