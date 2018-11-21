import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.scss';


export class MapArea extends Component {

  
    render() {
      let hikeMarkers;

      if(this.props.trails[0] !== undefined){
        //console.log("gang",this.props.trails);
        let count = 0;
      hikeMarkers = this.props.trails.map((hike) => {
        count++;
        return (
        <Marker key={hike.name + count} position= {[hike.latitude,hike.longitude]}>
            <Popup>
            {hike.name} <br />
            {hike.location} <br />
            {hike.summary}
            </Popup>
        </Marker>
      );
    });
  } else{
    hikeMarkers = <Marker position={[this.props.lat,this.props.lng]} />
  }
      const position=[this.props.lat, this.props.lng]
      return (
        <Map key={position} center={position} zoom={9}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2pnb29kd2lucyIsImEiOiJjam8zNnF4YmUwdTA3M3BybGtocWkzejY4In0.9eALJdo0A_rMgg2cgZWHlQ"
          />
        {hikeMarkers}
        </Map>
      )
    }
  }
