import { useState } from "react";

const Form = ({ setFormInfo }) => {
  const [formInputs, setFormInputs] = useState({
    countryCode: "GM",
    year: 2022,
  });
  const handleChange = (e) => {
    if (e.target.name === "countryCode") {
      setFormInputs({
        ...formInputs,
        countryCode: e.target.value,
      });
    } else {
      setFormInputs({
        ...formInputs,
        year: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormInfo(formInputs);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="countryCode">country code:</label>
        <input
          className="inputs"
          onChange={handleChange}
          type="text"
          value={formInputs.countryCode}
          placeholder="e.g UK"
          name="countryCode"
        />
      </div>
      <div>
        <label htmlFor="year">year:</label>
        <input
          className="inputs"
          onChange={handleChange}
          type="number"
          value={formInputs.year}
          placeholder="e.g 2022"
          name="year"
        />
      </div>
      <button type="submit">Find holiday</button>
    </form>
  );
};

export default Form;
