var stripe = require('stripe')('sk_test_4UNeAg7ULlqyKdIUjHj0hx8G002Zx3RDDz');

stripe.customers.create(
  {
    description: 'My First Test Customer (created for API docs)',
  },
  function(err, customer) {
    // asynchronously called
  }
);
