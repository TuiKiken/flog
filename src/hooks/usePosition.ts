import { useEffect, useState } from 'react';
import { message } from 'antd';

export const usePosition = () => {
  const [position, setPosition] = useState<GeolocationCoordinates | undefined>();

  useEffect(() => {
    if(!navigator.geolocation) {
      message.error('Геолокация не поддерживается браузером', 20);
      return;
    }

    navigator.permissions
      .query({name:'geolocation'})
      .then(result => {
        if (result.state === 'denied') {
          message.error('Нет прав на получение геолокации', 20);
        }
      });

    navigator
      .geolocation
      .getCurrentPosition(({ coords }) => {
        setPosition(coords);
      }, (error) => {
        message.error(error.message, 20);
      });
  }, []);

  return position;
}
