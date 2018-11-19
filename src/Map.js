import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.scss';


export class MapArea extends Component {
    state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: 13,
    }
  
    render() {
      const position = [this.state.lat, this.state.lng]
      return (
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2pnb29kd2lucyIsImEiOiJjam8zNnF4YmUwdTA3M3BybGtocWkzejY4In0.9eALJdo0A_rMgg2cgZWHlQ"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      )
    }
  }
