import React from "react";
import Select from "react-select";

class select extends React.Component {
  customStyles = {
    dropdownIndicator: this.dropdownIndicatorStyles,
    control: (base, state) => ({
      ...base,
      padding: "5.5px 5px",
      transition: "none",
      maxWidth: "288px",
      textTransform: "capitalize",
      width: "100%",
      background: " #FFFFFF",
      border: "0px",
      outline: "none",
      boxShadow: " inset 0px 0px 4px rgba(0, 0, 0, 0.2)",
      borderRadius: "4px",
      "&:hover": {
        // border: `1px solid ${this.props.hoverColor}`,
        // boxShadow:`1px 1px 2px 1px rgb(191,191,191)`,
      },
    }),
    menu: (base) => ({
      ...base,
      marginTop: "0px",
      maxWidth: "288px",
      outline: "none",
      zIndex: "3",
      textTransform: "capitalize",
      border: "0px solid white",
      transition: "none",
    }),
    menuList: (base) => ({
      ...base,
      color: "#575757;",
      fontSize: "12px",
      maxWidth: "288px",
      textTransform: "capitalize",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? `#094A55` : `transparent`,
      color: state.isSelected ? `white` : `black`,
      "&:hover": {
        backgroundColor:state.isSelected ? `#094A55` : `#E9E9E9`,
        Color: `#094A55`,
      },
    }),
    input: (base, state) => ({
      ...base,
      '[type="text"]': {
        color: `#575757; !important`,
      },
    }),
  };

  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    return (
      <Select
        className={this.props.classname}
        // components={{ DropdownIndicator }}
        styles={this.customStyles}
        value={this.props.value}
        onInputChange={this.props.inputChange}
        onChange={this.props.onChange}
        options={this.props.options}
        isSearchable
        isLoading={this.props.load}
        isDisabled={this.props.disable}
        placeholder={this.props.placeholder}
        menuIsOpen={this.props.menuIsOpen}
        isMulti={this.props.isMulti}
      />
    );
  }
}

export default select;
