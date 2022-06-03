import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './style.less'

class SearchBox extends Component {
  static propTypes = {
    mapsapi: PropTypes.shape({
      places: PropTypes.shape({
        SearchBox: PropTypes.func,
      }),
      event: PropTypes.shape({
        clearInstanceListeners: PropTypes.func,
      }),
    }).isRequired,
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
  };

  static defaultProps = {
    onPlacesChanged: null,
  };

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    const {
      mapsapi: { places },
    } = this.props;

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    const {
      mapsapi: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    const { onPlacesChanged } = this.props;
    this.props.setLat(this.searchBox.getPlaces()[0].geometry.location.lat())
    this.props.setLng(this.searchBox.getPlaces()[0].geometry.location.lng())

    if (onPlacesChanged) {
      onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  render() {
    const { placeholder } = this.props;

    return (
      <input
        ref={this.searchInput}
        placeholder={placeholder}
        className="search-box"
        type="text"
        style={{
          width: '300px',
          height: '40px',
          fontSize: '20px',
          padding: '12px 10px 11px 10px',
          borderWidth: '1px',
          borderRadius: '5px',
          position: 'absolute', top: 70, left: 10
        }}
      />
    );
  }
}

export default SearchBox;
