document.addEventListener('DOMContentLoaded', () => {
  const amountInput = document.getElementById('amount');
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');
  const convertedAmountInput = document.getElementById('convertedAmount');
  const convertBtn = document.getElementById('convertBtn');
  const fromFlag = document.getElementById('fromFlag');
  const toFlag = document.getElementById('toFlag');

  let exchangeRates = {};

  // Fetch exchange rates from a public API
  fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
          exchangeRates = data.rates;
          populateCurrencyOptions();
      })
      .catch(error => console.error('Error fetching exchange rates:', error));

  // Populate currency options
  function populateCurrencyOptions() {
      const currencies = Object.keys(exchangeRates);
      currencies.forEach(currency => {
          const option1 = document.createElement('option');
          option1.value = currency;
          option1.textContent = currency;
          fromCurrencySelect.appendChild(option1);

          const option2 = document.createElement('option');
          option2.value = currency;
          option2.textContent = currency;
          toCurrencySelect.appendChild(option2);
      });

      // Set default values
      fromCurrencySelect.value = 'USD';
      toCurrencySelect.value = 'EUR';
      updateFlags();
  }

  // Update flags based on selected currencies
  function updateFlags() {
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
      fromFlag.className = `flag-icon flag-icon-${fromCurrency.toLowerCase().slice(0, 2)}`;
      toFlag.className = `flag-icon flag-icon-${toCurrency.toLowerCase().slice(0, 2)}`;
  }

  // Convert currency
  function convertCurrency() {
      const amount = parseFloat(amountInput.value);
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;

      if (isNaN(amount) || !fromCurrency || !toCurrency) {
          alert('Please enter a valid amount and select currencies.');
          return;
      }

      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      const convertedAmount = (amount / fromRate) * toRate;

      convertedAmountInput.value = convertedAmount.toFixed(2);
  }

  // Event listeners
  fromCurrencySelect.addEventListener('change', updateFlags);
  toCurrencySelect.addEventListener('change', updateFlags);
  convertBtn.addEventListener('click', convertCurrency);
});