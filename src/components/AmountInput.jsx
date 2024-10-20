/* eslint-disable react/prop-types */
function AmountInput({ value, onChange }) {
  return (
    <input
      type="number"
      required
      value={value}
      placeholder="Amount"
      onChange={onChange}
    />
  );
}

export default AmountInput;
