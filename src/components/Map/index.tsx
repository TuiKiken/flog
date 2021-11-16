import React, { useCallback, useMemo } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { AimOutlined, EnvironmentTwoTone } from '@ant-design/icons';

import { Coordinates } from 'types/map';

import { GOOGLE_MAP_API_KEY } from 'configs';

interface MapProps {
  mapCenter: Coordinates;
  userPosition?: Coordinates;
  onMapCenterChange?: (mapCenter: Coordinates) => void;
}

const URL_KEYS = { key: GOOGLE_MAP_API_KEY };

const UserLocation = (props: Coords) => (<EnvironmentTwoTone className="user-location" twoToneColor="#FF4333" />);

export const Map: React.FC<MapProps> = ({ mapCenter, userPosition, onMapCenterChange }) => {
  const handleDragEnd = useCallback(
    (map: any) => onMapCenterChange?.({ latitude: map.center.lat(), longitude: map.center.lng() }),
    [onMapCenterChange],
    );
  const center = useMemo(() => ({ lat: mapCenter.latitude, lng: mapCenter.longitude }), [mapCenter])

  return (
    <div className="map-container">
      <AimOutlined className="map-center" />
      <GoogleMapReact
        onDragEnd={handleDragEnd}
        bootstrapURLKeys={URL_KEYS}
        center={center}
        defaultZoom={14}>
        {userPosition && <UserLocation lat={userPosition.latitude} lng={userPosition.longitude} />}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
