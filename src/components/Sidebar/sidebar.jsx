import React from 'react';
import chroma from 'chroma-js';
import StackedBar from '../Charts/stackedBar';
import Accordion from '../Accordion/accordion';

/**
* Sidebar object
*
* @return {object} Returns sidebar markup
*/
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  infoPanel() {
    if (this.props.selectedSchool.length === 0) {
      return (<p/>)
    } else {
      const gradesInSchool = this.props.selectedSchool.grades.map(grade => <span key={grade}>{grade.replace('grade_', '')}, </span>);
      const capacityElements = [
        { grade: 'Elementary', fill: '#9EDDFC' },
        { grade: 'Middle', fill: '#63D1F4' },
        { grade: 'High', fill: '#1EACF1' },
        { grade: 'Alternate', fill: '#4670A7' },
      ];
      const enrollmentGrades = [
        'Pre-Kindergarten',
        'Kindergarten',
        'Grade 1',
        'Grade 2',
        'Grade 3',
        'Grade 4',
        'Grade 5',
        'Grade 6',
        'Grade 7',
        'Grade 8',
        'Grade 9',
        'Grade 10',
        'Grade 11',
        'Grade 12',
      ];
      const enrollmentColors = chroma.scale(['#9EDDFC', '#4670A7']).colors(enrollmentGrades.length);
      const enrollmentElements = enrollmentGrades.map((e, i) => (
        { grade: e, fill: enrollmentColors[i] }
      ));
      return (
        <div>
          <span className="ctda-label-name">School: {this.props.selectedSchool.name}</span>
          <span className="ctda-label-name">District: {this.props.selectedSchool.district_name}</span>
          <p>Grades: {gradesInSchool}</p>
          <Accordion header="District Capacity by Grade Range">
            <StackedBar
              data={this.props.selectedSchool.capacity}
              elements={capacityElements}
              title=""
            />
          </Accordion>
          <Accordion header="School Enrollment by Grade">
            <StackedBar
              data={this.props.selectedSchool.school_enrollment}
              elements={enrollmentElements}
            />
          </Accordion>
        </div>
      );
    }
  }

  render() {
    const infoText = 'Click on a school to see school and district capacity and enrollment data.';
    return (
      <div className="ctdl-datasidebar-sidebar">
        <Accordion header="What is this?">
          <p>{infoText}</p>
        </Accordion>
        {this.infoPanel()}
      </div>
    );
  }
}

export default Sidebar;
