import * as React from 'react';
import { Modal } from './Modal';

type TProps = {
  isShown: boolean;
  onMediaReceive?(stream: MediaStream): void;
};

/**
 * Modal window for request to accessing of user's microphone
 */
export const AudioRequestModal = (props: TProps) => {
  React.useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (typeof props.onMediaReceive === 'function') {
        props.onMediaReceive(stream);
      }
    })();
  });

  return <Modal isShown={props.isShown}>Для использования тюнера требуется включить микрофон</Modal>;
};
