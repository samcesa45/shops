import React, {useState, useRef} from 'react';
import {Modal, Pressable, Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  label: string;
  data: Array<{label: string; value: string}>;
  onSelect: (item: {label: string; value: string}) => void;
};
const Dropdown = ({label, data, onSelect}: Props) => {
  const dropDownRef = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [dropdownTop, setDropDownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    dropDownRef.current?.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        h: number,
        _px: number,
        py: number
      ) => {
        setDropDownTop(py + h);
      }
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };
  const renderItem = ({item}: any) => {
    <Pressable style={{}} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </Pressable>;
  };
  const renderDropdown = () => {
    if (visible) {
      return (
        // <Text
        //   className="bg-white w-[138px] left-4"
        //   style={{position: 'absolute', top: 50}}>
        //   This is where the dropdown will be rendered.
        // </Text>
        <Modal visible={visible} transparent animationType="none">
          <Pressable
            style={{width: '100%', height: '100%'}}
            onPress={() => setVisible(false)}>
            <View>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Pressable>
        </Modal>
      );
    }
  };
  return (
    <Pressable
      onPress={toggleDropdown}
      className="flex flex-row bg-[#efefef] h-[50px] w-[90%] px-[10px] z-[1]">
      {renderDropdown()}
      <View className="border border-[#9B9B9B] px-3 w-[138px] h-[40px] rounded-[8px] flex flex-row items-center justify-between">
        <Text
          className="text-[#222] text-sm font-medium"
          style={{fontFamily: 'CircularStd'}}>
          {label}
        </Text>
        <Icon name="angle-down" color={'#222'} size={30} />
      </View>
    </Pressable>
  );
};

export default Dropdown;
