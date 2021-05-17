import { useEffect, useState } from 'react';
import { message } from 'antd';

export const usePosition = () => {
  const [position, setPosition] = useState<GeolocationCoordinates | undefined>();

  useEffect(() => {
    if(!navigator.geolocation) {
      message.error('Геолокация не поддерживается браузером');
      return;
    }

    navigator.permissions
      .query({name:'geolocation'})
      .then(result => {
        if (result.state === 'denied') {
          message.error('Нет прав на получение геолокации');
        }
      });

    navigator
      .geolocation
      .getCurrentPosition(({ coords }) => {
        setPosition(coords);
      }, (error) => {
        console.error(error);
      });
  }, []);

  return position;
}
