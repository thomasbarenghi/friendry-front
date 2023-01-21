const Checkbox = ({ codes, selectedCodes, handleChange }) => {
    return (
      <div>
        {codes.map((code) => (
          <label key={code}>
            <input
              type="checkbox"
              value={code}
              checked={selectedCodes.includes(code)}
              onChange={handleChange}
            />
            {code}
          </label>
        ))}
      </div>
    );
  }

  export default Checkbox;