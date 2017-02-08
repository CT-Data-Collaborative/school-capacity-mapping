import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
* CTData Chart object
*
* @return {object} Returns chart markup
*/
class StackedBar extends React.Component {
  constructor(props) {
    super(props)
  }

  chartBuilder() {
    const data = this.props.data;
    const margins = {top: 15, right: 10, left: 0, bottom: 5};
    const title = this.props.title;
    const elements = this.props.elements;
    return (
      <div className="ctdm-chart">
        <p className="ctda-chart-title">{title}</p>
        <ResponsiveContainer width="90%" aspect={2}>
          <BarChart data={data} margin={margins}>
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip offset={0} />
            <Legend />
            {elements.map(e => <Bar key={e.grade} dataKey={e.grade} stackId="a" fill={e.fill} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  render() {
      return this.chartBuilder();
  }
}

export default StackedBar;
