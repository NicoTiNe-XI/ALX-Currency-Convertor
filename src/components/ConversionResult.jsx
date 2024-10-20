/* eslint-disable react/prop-types */
function ConversionResult({ value }) {
  return (
    <input
      type="number"
      disabled
      value={value}
      placeholder="Converted Amount"
    />
  );
}

export default ConversionResult;
