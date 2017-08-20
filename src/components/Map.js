import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Station from './Station';
import Connection from './Connection';
import Train from './Train';
import { stations } from '../reducers/stations';
import { trains } from '../reducers/trains';

export class Map extends React.Component {
  static propTypes = {
    connections: PropTypes.array,
    map: PropTypes.object,
    stations: PropTypes.array,
  }

  render() {
    const viewBox = [
      this.props.map.viewBox.minX,
      this.props.map.viewBox.minY,
      this.props.map.viewBox.width,
      this.props.map.viewBox.height,
    ].join(' ');

    return (
      <svg viewBox={viewBox}>
        {this.props.connections.map((connection, i) => (
          <Connection
            key={`connection-${i}`}
            connection={connection}
          />
        ))}

        {this.props.trains.map((train, i) => (
          <Train
            key={`train-${i}`}
            train={train}
          />
        ))}

        {this.props.stations.map((station, i) => (
          <Station
            key={`station-${i}`}
            station={station}
          />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    connections: state.connections,
    map: state.map,
    stations: stations(state.stations),
    trains: trains(state.trains),
  };
}

export default connect(mapStateToProps)(Map);
