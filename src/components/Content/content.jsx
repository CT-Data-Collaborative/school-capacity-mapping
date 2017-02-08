import React from 'react';
import axios from 'axios';
import CTDataMap from '../Map/map';
import Sidebar from '../Sidebar/sidebar';

/**
* Basic CTData Footer object
*
* @return {object} Returns content section markup
*/

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      townsBoundaries: [],
      schoolPoints: [],
      schoolFilter: 'EASTCONN',
      selectedSchool: [],
    };
    this.handleRescSelect = this.handleRescSelect.bind(this);
    this.handleSelectedSchool = this.handleSelectedSchool.bind(this);
  }

  componentWillMount() {
    axios('https://s3.amazonaws.com/schoolcapacity/towns.json')
      .then((towns) => {
        this.setState({ townsBoundaries: towns.data.features });
      });
    axios('https://s3.amazonaws.com/schoolcapacity/schools_with_data.json')
      .then((schools) => {
        this.setState({ schoolPoints: schools.data.features });
      });
  }

  handleRescSelect(value) {
    this.setState({ schoolFilter: value });
  }

  handleSelectedSchool(value) {
    console.log(value);
    this.setState({ selectedSchool: value});
  }

  render() {
    const towns = this.state.townsBoundaries;
    const schools = this.state.schoolPoints;
    return (
      <div className="ctdl-fixed-header-footer">
        <div className="ctdl-datasidebar">
          <CTDataMap
            towns={towns}
            schools={schools}
            onChange={this.handleRescSelect}
            schoolFilter={this.state.schoolFilter}
            handleSchoolClick={this.handleSelectedSchool}
          />
          <Sidebar selectedSchool={this.state.selectedSchool} />
        </div>
      </div>
    );
  }
}

export default Content;
