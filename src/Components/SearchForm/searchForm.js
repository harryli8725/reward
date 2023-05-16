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
    // handle form submit here
  };

  // const handleFormClear = () => {
  //   setQuery({
  //     name: "",
  //     date: "",
  //   });
  // };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <div className="search-form__field">
        <label className="search-form__label" htmlFor="name">
          Customer Name:
        </label>
        <input
          className="search-form__input"
          type="text"
          id="name"
          name="name"
          placeholder="Enter customer name"
          value={query.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="search-form__field">
        <label className="search-form__label" htmlFor="date">
          Transaction Date:
        </label>
        <input
          className="search-form__input"
          type="date"
          id="date"
          name="date"
          placeholder="Enter transaction date"
          value={query.date}
          onChange={handleInputChange}
        />
      </div>
      {/* <div className="search-form__field">
        <button className="search-form__button" type="submit">
          Search
        </button>
        <button
          className="search-form__button"
          type="button"
          onClick={handleFormClear}
        >
          Clear
        </button>
      </div> */}
    </form>
  );
};

export default SearchForm;
