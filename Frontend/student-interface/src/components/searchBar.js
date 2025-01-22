import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar({ value, onChange, onSearch, onClear }) {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={value ? onClear : onSearch}>
              {value ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ marginTop: 2 }}
    />
  );
}

export default SearchBar;
