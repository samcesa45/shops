import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {ColorPicker} from 'react-native-btr';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {useAppDispatch, useAppSelector} from '../../state-management/hooks';
import {
  filters,
  setColorFilter,
} from '../../state-management/features/filterSlice';

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
};
const {width} = Dimensions.get('window');

const deviceWidth =
  Platform.OS === 'ios'
    ? Dimensions.get('window').width
    : ExtraDimensions.get('REAL_WINDOW_WIDTH');
const ColorModal = ({modalVisible, setModalVisible}: Props) => {
  const [selected, setSelected] = useState(0);
  const handleSelected = (value: number) => setSelected(value);
  const {color} = useAppSelector(filters);
  const dispatch = useAppDispatch();
  const handleColorChange = (color: string) => dispatch(setColorFilter(color));
  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={modalVisible}
        deviceWidth={deviceWidth}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <View className="flex flex-row justify-center mt-3.5">
            <View className="w-[60px] h-[6px] bg-[#9B9B9B] rounded-[3px]"></View>
          </View>
          <Text
            className="text-center pt-[16px] text-[#222] text-[18px] font-bold leading-[120%]"
            style={{fontFamily: 'CircularStd', fontStyle: 'italic'}}>
            Select Color
          </Text>
          <View className="flex flex-row justify-center  px-4">
            <ColorPicker
              onSelect={handleColorChange}
              selectedColor={color}
              colors={['black', 'red', 'grey', 'orange', 'green']}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: -20,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    right: -10,
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    width: width,
    height: 352,
    backgroundColor: '#F9F9F9',
    // paddingLeft: 16,
  },
});

export default ColorModal;
