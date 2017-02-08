import React from 'react';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accordion: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ accordion: !this.state.accordion });
  }

  render() {
    const accordion = this.state.accordion;
    const header = this.props.header;
    const panelState = accordion ? 'visible' : 'hidden';
    const icon = accordion ? <i className="fa fa-minus" /> : <i className="fa fa-plus" />;
    const contentClass = `ctdo-accordion-panel--${panelState}`;
    return (
      <div className="ctdo-accordion">
        <button className="ctdo-accordion-header" onClick={this.toggle}>
          {header}
          <span className="ctda-accordion-icon">{icon}</span>
        </button>
        <div className={contentClass}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Accordion;
