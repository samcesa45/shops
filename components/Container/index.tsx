import React from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
type Props = {
  children: React.ReactNode;
  isScrollable: boolean;
  style: object;
};

export default function Container({children, isScrollable, style}: Props) {
  return (
    <SafeAreaView className="flex-1">
      {isScrollable ? (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.innerView, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerView: {
    flex: 1,
  },
});
