import React from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { AimOutlined, EnvironmentTwoTone } from '@ant-design/icons';

import { Coordinates } from 'types/map';

import { GOOGLE_MAP_API_KEY } from 'configs';

interface MapProps {
  mapCenter: Coordinates;
  userPosition: Coordinates | undefined;
  onMapCenterChange: (mapCenter: Coordinates) => void;
}

const UserLocation = (props: Coords) => (<EnvironmentTwoTone className="user-location" twoToneColor="#FF4333" />);

export const Map: React.FC<MapProps> = ({ mapCenter, userPosition, onMapCenterChange }) => {
  return (
    <div className="map-container">
      <AimOutlined className="map-center" />
      <GoogleMapReact
        onDragEnd={map => onMapCenterChange({ latitude: map.center.lat(), longitude: map.center.lng() })}
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
        defaultZoom={14}>
        {userPosition && <UserLocation lat={userPosition.latitude} lng={userPosition.longitude} />}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
