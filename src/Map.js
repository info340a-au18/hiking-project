import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.scss';


export class MapArea extends Component {

  
    render() {
      const position=[this.props.lat, this.props.lng]
      return (
        <Map center={position} zoom={13}>
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
