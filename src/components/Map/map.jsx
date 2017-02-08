import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Control from 'react-leaflet-control';
import SelectForm from '../Select/selectForm';

const arcgisTiles = 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const arcgisAttr = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ';
const mapCenter = [41.5013, -72.8325];
const zoomLevel = 9;

class CTDataMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel,
      towns: [],
      schools: [],
      schoolFilter: props.schoolFilter,
      highlightedTown: '',
    };
    this.onEachSchoolFeature = this.onEachSchoolFeature.bind(this);
    this.onEachTownFeature = this.onEachTownFeature.bind(this);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.schoolFilter !== 'All' && nextProps.schools.length > 0) {
      this.setState({
        towns: nextProps.towns,
        schools: nextProps.schools.filter(school =>
          school.properties.resc === nextProps.schoolFilter)
      });
    } else {
      this.setState({
        towns: nextProps.towns,
        schools: nextProps.schools,
      });
    }
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  handleClick (e) {
    console.log(e.properties);
  }

  style(feature) {
    return {
      fillColor: '#1EACF1',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.4
    };
  }

  clickToFeature(e) {
    const layer = e.target;
    this.props.handleSchoolClick(layer.feature.properties);
  }

  hoverSchool(e) {
    const layer = e.target;
    this.setState({highlightedTown: layer.feature.properties.NAME10});
    this.props.handleTownHover(layer.feature.properties.NAME10);
  }

  finishHoverSchool(e) {
    this.setState({highlightedTown: ''});
    this.props.handleTownHover('');
  }

  onEachTownFeature(feature, layer) {
    layer.on({
      mouseover: this.hoverSchool.bind(this),
      mouseout: this.finishHoverSchool.bind(this),
    });
  }

  onEachSchoolFeature(feature, layer) {
    layer.on({
      click: this.clickToFeature.bind(this),
    });
  }

  render() {
    const schoolGEOJSON = { type: 'FeatureCollection', features: this.state.schools };
    const schoolKey = `schools_${this.state.schools.length}`;
    const townsGEOJSON = { type: 'FeatureCollection', features: this.state.towns };
    const townsKey = `towns_${this.state.towns.length}`;
    const highlightedTown = this.state.highlightedTown;
    const townStr = highlightedTown === '' ? <span /> : <span>Current Town: {highlightedTown}</span>;
    return (
      <div className="ctdl-datasidebar-main">
        <Map ref={m => { this.leafletMap = m; }} center={mapCenter} zoom={zoomLevel}>
          <TileLayer attribution={arcgisAttr} url={arcgisTiles} />
          <GeoJSON
            key={townsKey}
            data={townsGEOJSON}
            style={this.style}
            onEachFeature={this.onEachTownFeature}
          />
          <GeoJSON
            onEachFeature={this.onEachSchoolFeature}
            key={schoolKey}
            data={schoolGEOJSON}
          />
        <Control position="topright">
          <div className="ctdm-map-select">
            {townStr}
            <SelectForm onChange={this.props.onChange} schoolFilter={this.props.schoolFilter} />
          </div>
        </Control>
        </Map>
      </div>
    );
  }
}

export default CTDataMap;
