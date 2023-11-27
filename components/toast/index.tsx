import React, {useEffect} from 'react';
import Toast from 'react-native-root-toast';

type Props = {
  visible: boolean;
  position?: number;
  shadow: boolean;
  animation: boolean;
  hideOnPress: boolean;
  title: string;
  onHide?: () => void;
};

const ShowToast = ({
  visible,
  position,
  shadow,
  animation,
  hideOnPress,
  title,
  onHide,
}: Props) => {
  return (
    <Toast
      style={{width: '100%'}}
      visible={visible}
      position={position}
      shadow={shadow}
      animation={animation}
      hideOnPress={hideOnPress}
      backgroundColor="white"
      onHide={onHide}
      textColor="#222">
      {title}
    </Toast>
  );
};
export default ShowToast;
