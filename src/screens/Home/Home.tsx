import { useAppTheme } from '@hooks';
import PagerView from 'react-native-pager-view';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
const buttons = ['Following', 'Featured'];

import useVideos from 'hooks/useVideos';
import { Box, LoadingOverlay, Text, VideoPlayer } from '@components';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from 'theme';
import { spacing } from '@shopify/restyle';
import useAppSelctor from 'hooks/useAppSelector';
import { Avatar, ButtonGroup, Divider, Image } from '@rneui/base';
import Entypo from 'react-native-vector-icons/Entypo';
import { buildAnimation } from 'utils/functions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DetailSheet from './Components/DetailSheet';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const Home: React.FC = ({ navigation }: any) => {
  const viewPagerRef: MutableRefObject<any> = useRef();
  const [opacity, setOpacity] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const { colors, spacing } = useAppTheme();
  const [page, setPage] = useState(1);
  const { token, user } = useAppSelctor(state => state.auth);
  const { data, isError, error, isLoading } = useVideos(page);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedButton, setSelectedBtn] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [story, setStory] = useState(null);
  const onPageSelected = useCallback(e => {
    setActivePage(e.nativeEvent.position);
    setIsPaused(false);
  }, []);

  const onLoadStart = async () => {
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({ isBuffering }) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  const onRefresh = () => {};
  return (
    <ScrollView
      contentContainerStyle={styles.main}
      scrollEnabled={false}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {isLoading ? (
        <LoadingOverlay size="large" color={colors.textOnPrimary} />
      ) : (
        <PagerView
          style={styles.main}
          orientation="vertical"
          onPageSelected={onPageSelected}
          ref={viewPagerRef}
        >
          {data?.data?.user?.data?.map((feed: any, index: number) => (
            <TouchableWithoutFeedback onPress={() => setIsPaused(!isPaused)}>
              <View key={feed.id} style={styles.pageContainer}>
                <VideoPlayer
                  item={feed}
                  isPaused={isPaused}
                  activePage={activePage}
                  onLoad={onLoad}
                  index={index}
                  onLoadStart={onLoadStart}
                  onBuffer={onBuffer}
                />
                <AnimatedBox
                  flex={1}
                  entering={buildAnimation(1)}
                  style={[styles.header, { top: spacing.xxxl }]}
                >
                  <Icon
                    onPress={() => {
                      Alert.alert('Coming Soon');
                    }}
                    name="search"
                    size={30}
                    color={theme.colors.textOnPrimary}
                  />
                  <ButtonGroup
                    onPress={index => {
                      setSelectedBtn(index);
                    }}
                    selectedIndex={selectedButton}
                    buttons={buttons}
                    textStyle={{ color: colors.textOnPrimary }}
                    selectedTextStyle={{ color: colors.primary }}
                    containerStyle={styles.buttonGroup}
                    selectedButtonStyle={{
                      borderTopLeftRadius: selectedButton === 0 ? 7 : 0,
                      borderBottomLeftRadius: selectedButton === 0 ? 7 : 0,
                      borderTopRightRadius: selectedButton === 1 ? 7 : 0,
                      borderBottomRightRadius: selectedButton === 1 ? 7 : 0,
                      backgroundColor: 'white',
                    }}
                  />
                  {token ? (
                    <Avatar
                      size={50}
                      avatarStyle={{ borderRadius: 25 }}
                      source={{
                        uri: user?.profile_image || AVATAR,
                      }}
                    />
                  ) : (
                    <Text
                      color="textOnPrimary"
                      style={styles.login}
                      onPress={() => {
                        navigation.navigate('Login');
                      }}
                    >
                      Login
                    </Text>
                  )}
                </AnimatedBox>

                <Box style={[styles.footer, { bottom: spacing.xxl }]}>
                  <Entypo
                    onPress={async () => {
                      setStory(feed);
                      setIsPaused(true);
                      bottomSheetModalRef.current?.present();
                    }}
                    name="chevron-small-up"
                    size={40}
                    color={colors.textOnPrimary}
                    style={styles.chevron}
                  />
                  <Text
                    color="textOnPrimary"
                    style={styles.title}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}
                  >
                    {feed?.title || ''}
                  </Text>
                  <Box flexDirection="row">
                    <Avatar
                      size={45}
                      avatarStyle={{
                        borderRadius: 25,
                      }}
                      source={{
                        uri:
                          feed?.user_details?.profile_image ||
                          'https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg',
                      }}
                    />
                    <Text color="textOnPrimary" style={styles.posterName}>
                      {feed?.user_details?.first_name +
                        ' ' +
                        feed?.user_details?.last_name || ''}
                    </Text>
                  </Box>
                </Box>
                {!isPaused && (
                  <ActivityIndicator
                    animating
                    size="large"
                    color={colors.textOnPrimary}
                    style={[styles.activityIndicator, { opacity: opacity }]}
                  />
                )}
                {isPaused && (
                  <Animated.Image
                    style={[styles.playBtn]}
                    source={require('@assets/icons/play.png')}
                  />
                )}
                <DetailSheet
                  story={story}
                  setIsPaused={(paused: any) => {
                    setIsPaused(paused);
                  }}
                  bottomSheetModalRef={bottomSheetModalRef}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </PagerView>
      )}
    </ScrollView>
  );
};

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
  chevron: { alignSelf: 'center', bottom: spacing.m },
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

export default Home;
