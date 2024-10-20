import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';

function CurrencyForm() {
  const [optionValue, setOptionValue] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState('USD');
  const [selectedTo, setSelectedTo] = useState('USD');
  const [inputValue, setInputValue] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState(0);

  async function fetchExchangeRate() {
    const exchangeRate_API =
      'https://v6.exchangerate-api.com/v6/117769f252c2a6f4318275d5/latest/USD';
    try {
      const response = await axios.get(exchangeRate_API);
      return response.data;
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchExchangeRate();
      if (fetchedData) {
        setOptionValue(fetchedData);
      } else {
        console.log('No data fetched or error occurred.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (optionValue?.conversion_rates) {
      const fromRate = optionValue.conversion_rates[selectedFrom];
      const toRate = optionValue.conversion_rates[selectedTo];
      const conversion = (inputValue * toRate) / fromRate;
      setCalculatedValue(conversion.toFixed(2));
    }
  }, [inputValue, selectedFrom, selectedTo, optionValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFromChange = (event) => {
    setSelectedFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setSelectedTo(event.target.value);
  };

  return (
    <form className="currency-convertor-form">
      <div className="input-group">
        <label htmlFor="currencyFrom">Amount</label>
        <div className="exchange-row">
          <CurrencySelector
            value={selectedFrom}
            onChange={handleFromChange}
            options={
              optionValue?.conversion_rates
                ? Object.keys(optionValue.conversion_rates)
                : []
            }
          />
          <AmountInput value={inputValue} onChange={handleInputChange} />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="currencyTo">Converted Amount</label>
        <div className="exchange-row">
          <CurrencySelector
            value={selectedTo}
            onChange={handleToChange}
            options={
              optionValue?.conversion_rates
                ? Object.keys(optionValue.conversion_rates)
                : []
            }
          />
          <ConversionResult value={calculatedValue} />
        </div>
      </div>
    </form>
  );
}

export default CurrencyForm;
