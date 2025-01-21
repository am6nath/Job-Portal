import React, { useState } from "react";
import { Box, Button, Typography, Menu, MenuItem, Radio, RadioGroup, FormControlLabel } from "@mui/material";

const TopGridBar = ({ onFilterApply }) => {
  const [activePopup, setActivePopup] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const filterOptions = {
    jobSector: ["IT   ", "Healthcare", "Finance"],
    jobType: ["full-time", "part-time", "contract", "freelancer"],
    location: ["All Kerala", "Kannur", "Wayanad", "Kochi", "Thrissur", "Kollam"],
  };

  const handleMenuOpen = (event, popup) => {
    setActivePopup(popup);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActivePopup("");
    setAnchorEl(null);
  };

  const handleOptionChange = (filterName, option) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [filterName]: option,
    }));
  };

  const handleApply = () => {
    if (Object.keys(selectedOption).length > 0) {
      onFilterApply(selectedOption);
    }
    handleMenuClose();
  };


  const handleClearFilters = () => {
    setSelectedOption({});
    onFilterApply({});
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Filters
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {Object.keys(filterOptions).map((filterName) => (
          <React.Fragment key={filterName}>
            <Button
              variant="outlined"
              onClick={(e) => handleMenuOpen(e, filterName)}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                textTransform: "capitalize",
                "&:hover": { borderColor: "#fff", backgroundColor: "#222" },
              }}
            >
              {filterName.replace(/^\w/, (c) => c.toUpperCase())}
            </Button>
            {activePopup === filterName && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#222",
                    color: "#fff",
                  },
                }}
              >
                <RadioGroup>
                  {filterOptions[filterName].map((option) => (
                    <MenuItem key={option} disableRipple>
                      <FormControlLabel
                        value={option}
                        control={<Radio />}
                        label={option}
                        checked={selectedOption[filterName] === option}
                        onChange={() => handleOptionChange(filterName, option)}
                        sx={{
                          color: "#fff",
                          "& .MuiRadio-root": { color: "#fff" },
                        }}
                      />
                    </MenuItem>
                  ))}
                </RadioGroup>
                <Button
                  variant="contained"
                  sx={{
                    m: 2,
                    backgroundColor: "#fff",
                    color: "#000",
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </Menu>
            )}
          </React.Fragment>
        ))}
        <Button
          variant="contained"
          onClick={handleClearFilters}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default TopGridBar;
