import React from 'react';

class SelectForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const value = this.props.schoolFilter;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Filter schools by picking a RESC:
          <select value={value} onChange={this.handleChange}>
            <option value="CREC">CREC</option>
            <option value="Learn">Learn</option>
            <option value="CES">CES</option>
            <option value="EASTCONN">EASTCONN</option>
            <option value="EdAdvance">EdAdvance</option>
            <option value="ACES">ACES</option>
            <option value="All">All Schools</option>
          </select>
        </label>
      </form>
    );
  }
}

export default SelectForm;
