import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  rating: number;
};

const StarRating = ({rating}: Props) => {
  const renderStars = () => {
    const filledStars = Math.floor(rating);
    //if decimal part is not equal to zero
    const hasHalfStar = rating % 1 !== 0;

    const starElements = [];

    for (let i = 1; i <= filledStars; i++) {
      starElements.push(
        <Ionicons
          key={`star-filled-${i}`}
          name="star"
          size={14}
          color="#FFBA49"
          style={{width: 14, height: 14}}
        />
      );
    }

    if (hasHalfStar) {
      starElements.push(
        <Ionicons
          key="star-half-full"
          name="star-half-full"
          size={14}
          color="#FFBA49"
          style={{width: 14, height: 14}}
        />
      );
    }

    const remainingStars = 5 - starElements.length;

    for (let i = 1; i <= remainingStars; i++) {
      starElements.push(
        <Ionicons
          key={`star-empty-${i}`}
          name="star-outline"
          size={14}
          color="#FFBA49"
          style={{width: 14, height: 14}}
        />
      );
    }

    return starElements;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
