import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import ArrowIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PromoCard from '../promoCard/PromoCard';
import Container from '../Container';

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
};
const {width} = Dimensions.get('window');

const deviceWidth =
  Platform.OS === 'ios'
    ? Dimensions.get('window').width
    : ExtraDimensions.get('REAL_WINDOW_WIDTH');
const PromoModal = ({modalVisible, setModalVisible}: Props) => {
  const [text, onChangeText] = React.useState('Enter your promo code');

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      <Modal
        isVisible={modalVisible}
        deviceWidth={deviceWidth}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <Container isScrollable style={{flex: 1}}>
            <View className="flex flex-row justify-center mt-3.5">
              <View className="w-[60px] h-[6px] bg-[#9B9B9B] rounded-[3px]"></View>
            </View>
            <View
              className="mt-[32px] w-[343px] h-9 bg-white text-[#222] "
              style={styles.textInputContainer}>
              <TextInput
                placeholder="Enter your promo code"
                value={text}
                onChangeText={onChangeText}
                cursorColor={'#9b9b9b'}
                editable
                className="text-[#222] h-12 pb-5 text-sm placeholder:text-[#9b9b9b] placeholder:font-bold font-medium   pl-5"
                style={{fontFamily: 'CircularStd'}}
              />
              <ArrowIcon
                onPress={() => setModalVisible(true)}
                color={'white'}
                style={styles.arrowIcon}
                size={24}
                name="arrow-right"
              />
            </View>
            <View className="pt-[32px]">
              <Text
                className="text-[#222] font-semibold text-[18px] leading-[22px]"
                style={styles.text}>
                Your Promo Codes
              </Text>
            </View>
            <PromoCard />
            <PromoCard />
            <PromoCard />
          </Container>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: -20,
    paddingHorizontal: 16,
    marginHorizontal: 0,
    right: -20,
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    width: width,
    height: 464,
    backgroundColor: '#F9F9F9',
  },
  text: {
    fontFamily: 'CircularStd',
    fontStyle: 'italic',
  },
  textInputContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    position: 'relative',
  },
  arrowIcon: {
    backgroundColor: '#222',
    width: 36,
    height: 36,
    borderRadius: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    padding: 6,
  },
});

export default PromoModal;
