import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog as MyDialog } from '@rneui/base';
import FastImage from 'react-native-fast-image';
import { Button, Text } from '@components';
import { useAppTheme } from '@hooks';
type DialogProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const Dialog = ({ visible = false, setVisible }: DialogProps) => {
  const { colors } = useAppTheme();

  return (
    <MyDialog
      isVisible={visible}
      overlayStyle={{
        height: 240,
        width: 320,
        borderRadius: 15,
        backgroundColor: 'white',
      }}
    >
      <FastImage
        resizeMode="contain"
        source={require('@assets/icons/warning.png')}
        style={{
          height: 60,
          width: 60,
          alignSelf: 'center',
        }}
      />
      <Text
        marginTop="l"
        color="black"
        style={{
          fontSize: 10,
          textAlign: 'center',
          fontWeight: '500',
          letterSpacing: 0.3,
        }}
      >
        {
          'You don’t have any approved Identity document. Complete Identity Document verification steps to create transaction.'
        }
      </Text>
      <Button
        marginTop="l"
        android_ripple={{ color: colors.primaryHighlight }}
        onPress={() => {
          setVisible(false);
        }}
        buttonStyle={
          {
            padding: 12,
          } as never
        }
        label={'OK'}
      />
    </MyDialog>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {},
});
