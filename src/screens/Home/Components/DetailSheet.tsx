import { Box, Text } from '@components';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAppTheme } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Divider } from '@rneui/base';
import * as React from 'react';
import { Share, StyleSheet, Image, Dimensions, Pressable, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from 'theme';

type DetailSheetProps = {
  story: any;
  bottomSheetModalRef: any;
  setIsPaused?: () => void;
};
const ICON_HEIGHT = 25;
const ICON_WIDTH = 25;
const AVATAR =
  'https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg';

const DetailSheet = ({
  story,
  bottomSheetModalRef,
  setIsPaused,
}: DetailSheetProps) => {
  const snapPoints = React.useMemo(() => [800], []);
  const { colors, spacing } = useAppTheme();
  const navigation = useNavigation();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${story.title} \n${story?.url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      handleComponent={() => (
        <Entypo
          onPress={() => {
            setIsPaused(false);
            bottomSheetModalRef.current?.close();
          }}
          name="chevron-down"
          size={30}
          color="white"
          style={{ alignSelf: 'center' }}
        />
      )}
      backgroundStyle={{
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      snapPoints={snapPoints}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <Box>
        <Text
          margin="m"
          color="textOnPrimary"
          style={styles.title}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          {story?.title || ''}
        </Text>
        <Box flexDirection="row" margin="s">
          <Avatar
            size={45}
            avatarStyle={{
              borderRadius: 25,
            }}
            source={{
              uri: story?.user_details?.profile_image || AVATAR,
            }}
          />
          <Text color="textOnPrimary" style={styles.posterName}>
            {story?.user_details?.first_name +
              ' ' +
              story?.user_details?.last_name || ''}
          </Text>
        </Box>
        <Box
          padding="m"
          style={{
            backgroundColor: '#0F0F0F',
            bottom: 0,
            height: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <Box flexDirection="row" justifyContent="space-between">
            <Pressable onPress={onShare}>
              <Box
                bg="primary"
                borderRadius="m"
                justifyContent="center"
                alignItems="center"
                style={{ padding: 15 }}
              >
                <Image
                  source={require('@assets/icons/share.png')}
                  style={{
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH,
                    resizeMode: 'contain',
                  }}
                />
              </Box>
            </Pressable>
            <Box
              bg="primary"
              borderRadius="m"
              justifyContent="center"
              alignItems="center"
              style={{ padding: 15 }}
              flexDirection="row"
            >
              <Image
                source={require('@assets/icons/likes.png')}
                style={{
                  height: ICON_HEIGHT,
                  width: ICON_WIDTH,
                  resizeMode: 'contain',
                }}
              />
              <Text color="textOnPrimary" style={styles.likes}>
                {story?.likes}
              </Text>
            </Box>
            <Box
              onPress={() => setShowComments(true)}
              bg="primary"
              borderRadius="m"
              justifyContent="center"
              alignItems="center"
              style={{ padding: 15 }}
              flexDirection="row"
            >
              <Image
                source={require('@assets/icons/comments.png')}
                style={{
                  height: ICON_HEIGHT,
                  width: ICON_WIDTH,
                  resizeMode: 'contain',
                }}
              />
              <Text color="textOnPrimary" style={styles.likes}>
                {story?.likes}
              </Text>
            </Box>
            <Box
              bg="primary"
              borderRadius="m"
              justifyContent="center"
              alignItems="center"
              style={{ padding: 15 }}
            >
              <Image
                source={require('@assets/icons/bookmark.png')}
                style={{
                  height: ICON_HEIGHT,
                  width: ICON_WIDTH,
                  resizeMode: 'contain',
                }}
              />
            </Box>
          </Box>
          <Text style={styles.about} color="buttonDisabledText">
            About
          </Text>
          <Text color="textOnPrimary" style={styles.aboutDetail}>
            {story?.about}
          </Text>

          <Box flexDirection="row" marginVertical="l">
            {story?.get_story_tags.map((item, index) => {
              return (
                <Pressable
                  style={{
                    backgroundColor: '#3F3F3F',
                    marginHorizontal: index !== 0 && 10,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Text color="textOnPrimary" style={styles.tag}>
                    {item?.tag}
                  </Text>
                </Pressable>
              );
            })}
          </Box>
          <Divider color="#3F3F3F" style={{ width: '110%', marginLeft: -12 }} />
          <Text style={styles.about} color="buttonDisabledText">
            Links
          </Text>
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}
            // onPress={() => {
            //   if (
            //     story?.link?.indexOf('http://') == 0 ||
            //     story?.link?.indexOf('https://') == 0
            //   ) {
            //     Linking.openURL(story?.link);
            //   } else {
            //     Linking.openURL('https://' + story?.link);
            //   }
            // }}
          >
            <Box flexDirection="row">
              <Image
                source={require('@assets/icons/link1.png')}
                style={{
                  tintColor: theme.colors.textOnPrimary,
                  height: 15,
                  width: 15,
                }}
              />
              <Text color="textOnPrimary" style={styles.tag}>
                {story?.link}
              </Text>
            </Box>
            <Image
              source={require('@assets/icons/link.png')}
              style={{ tintColor: '#BEBEBE', height: 20, width: 20 }}
            />
          </Box>
          <Divider
            color="#3F3F3F"
            style={{ marginTop: 10, width: '110%', marginLeft: -12 }}
          />
          <Text style={styles.about} color="buttonDisabledText">
            Partners
          </Text>
        </Box>
      </Box>
    </BottomSheetModal>
  );
};

export default DetailSheet;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonGroup: {
    width: '40%',
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: 'transparent',
    borderRadius: 7,
    borderWidth: 0,
  },
  likes: {
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: '700',
    alignSelf: 'center',
    marginLeft: 10,
  },
  about: {
    fontSize: 18,
    margin: 5,
    marginTop: 20,
    color: '#BEBEBE',
  },
  aboutDetail: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
    marginVertical: 5,
  },
  tag: {
    marginHorizontal: 5,
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.5,
    fontWeight: '700',
    marginVertical: 10,
  },
  sideBar: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '14%',
    height: '50%',
    right: '2%',
    bottom: 110,
  },
  posterName: {
    fontSize: 17,
    letterSpacing: 0.5,
    fontWeight: '500',
    alignSelf: 'center',
    marginLeft: 10,
  },
  login: {
    fontSize: 17,
    letterSpacing: 0.5,
    fontWeight: '500',
  },

  header: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 10,
    width: '95%',
  },
  activityIndicator: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: 70,
    right: 70,
    height: 50,
  },

  video: {
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  pageContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
  },
  playBtn: {
    position: 'absolute',
    width: 82,
    height: 82,
    alignSelf: 'center',
    resizeMode: 'contain',
    top: Dimensions.get('window').height / 2,
    opacity: 0.5,
  },
  feedContent: {
    position: 'absolute',
    flexDirection: 'column',
    width: '60%',
    left: '3%',
    bottom: 95,
  },
});
