const CodeFilter = ({ options, handleChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(new Set());
  
    const handleOptionChange = (e) => {
      const { value } = e.target;
      if (selectedOptions.has(value)) {
        selectedOptions.delete(value);
      } else {
        selectedOptions.add(value);
      }
      setSelectedOptions(new Set(selectedOptions));
      handleChange(Array.from(selectedOptions));
    }
  
    return (
      <div>
        {options.map(option => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.has(option)}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  };
  