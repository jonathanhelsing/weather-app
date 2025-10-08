import React from "react";
import { SearchIcon } from "./Icons";

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const styles = {
    searchContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "30px",
    },
    input: {
      flex: 1,
      padding: "12px 20px",
      border: "2px solid #e0e0e0",
      borderRadius: "10px",
      fontSize: "14px",
      outline: "none",
      fontFamily: "inherit",
    },
    searchButton: {
      padding: "12px 20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s",
    },
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search city..."
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        style={styles.input}
      />
      <button onClick={onSearch} style={styles.searchButton}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
