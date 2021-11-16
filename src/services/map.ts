import { Coordinates } from 'types/map';
import { GOOGLE_MAP_API_KEY } from 'configs';

export const getMapPreviewUrl = (mapCenter: Coordinates) => {
  const params = {
    center: `${mapCenter.longitude},${mapCenter.latitude}`,
    zoom: 12,
    size: '100x100',
    key: GOOGLE_MAP_API_KEY,
  };
  const urlParams = Object.entries(params).map(([k,v]) => `${k}=${v}`).join('&')

  return `https://maps.googleapis.com/maps/api/staticmap?${urlParams}`
}
