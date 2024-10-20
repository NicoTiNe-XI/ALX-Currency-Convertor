/* eslint-disable react/prop-types */
function CurrencySelector({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange}>
      {!options || options.length === 0 ? (
        <option value="">No Data Available</option>
      ) : (
        options.map((currencyCode) => (
          <option value={currencyCode} key={currencyCode}>
            {currencyCode}
          </option>
        ))
      )}
    </select>
  );
}

export default CurrencySelector;
