import React from "react";
import "./style.css";

const SearchForm = ({ query, setQuery }) => {
  const handleInputChange = (event) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleFormClear = () => {
    setQuery({
      name: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <div className="search-form__field">
        <label className="search-form__label" htmlFor="name">
          Customer Name:
        </label>
        <div className="tooltip">
          <input
            className="search-form__input"
            type="text"
            id="name"
            name="name"
            placeholder="Enter customer name"
            value={query.name}
            onChange={handleInputChange}
          />
          <span className="tooltiptext">
            Enter full name to view total points
          </span>
        </div>
      </div>
      <div className="search-form__field">
        <label className="search-form__label" htmlFor="startDate">
          Start Date:
        </label>
        <input
          className="search-form__input"
          type="date"
          id="startDate"
          name="startDate"
          placeholder="Enter start date"
          value={query.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="search-form__field">
        <label className="search-form__label" htmlFor="endDate">
          End Date:
        </label>
        <input
          className="search-form__input"
          type="date"
          id="endDate"
          name="endDate"
          placeholder="Enter end date"
          value={query.endDate}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" onClick={handleFormClear}>
        Clear
      </button>
    </form>
  );
};

export default SearchForm;
