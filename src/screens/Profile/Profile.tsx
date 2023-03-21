import { Box, LoadingOverlay, ScreenHeader, Text } from '@components';
import { useUserStories, useBookMarks } from '@hooks';
import { ButtonGroup } from '@rneui/base';
import useAppSelctor from 'hooks/useAppSelector';
import * as React from 'react';
import { Image, Linking, Pressable, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'theme';
import Animated, { SlideInRight } from 'react-native-reanimated';

interface ProfileProps {}
import moment from 'moment';
import { buildAnimation } from 'utils/functions';
const FOLLOWING_ICON_HEIGHT = 25;
const FOLLOWING_ICON_WIDTH = 25;
const buttons = ['Stories', 'Bookmarks'];
const AnimatedBox = Animated.createAnimatedComponent(Box);

const Profile = ({ navigation }: ProfileProps) => {
  const { token, user } = useAppSelctor(state => state.auth);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { data, isLoading, isError, error } = useUserStories(token, user.id);
  const bookmarks = useBookMarks(token, user.id);
  const UserStory = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('GeneralPlayer', {
            videos:
              selectedIndex == 0
                ? data?.data?.stories
                : bookmarks?.data?.stories,
            index: index,
          });
        }}
      >
        <AnimatedBox entering={buildAnimation(index + 1)}>
          <Box
            flex={1}
            flexDirection="row"
            padding="xs"
            margin="s"
            // justifyContent="space-between"
          >
            <FastImage
              resizeMode="cover"
              source={{ uri: item?.thumbnail }}
              style={{
                height: 160,
                width: 100,
                borderRadius: 10,
              }}
            />

            <Box marginLeft="s" flex={1}>
              <Text color="primary" style={styles.date}>
                {moment(item?.updated_at).format('MMM DD, YYYY')}
              </Text>
              <Box flex={0.9} justifyContent="center">
                <Text color="primary" style={styles.storyTitle}>
                  {item?.title}
                </Text>
                <Text color="primary" style={styles.storyAbout}>
                  {item?.about}
                </Text>
              </Box>
              <Box flexDirection="row" marginVertical="l">
                {item?.get_story_tags.map((tag, index) => {
                  if (item.get_story_tags.length >= 3) {
                    if (index == 0) {
                      return (
                        <Pressable
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.13)',
                            marginHorizontal: index !== 0 && 10,
                            borderRadius: 6,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                          }}
                        >
                          <Text color="textOnPrimary" style={styles.tag}>
                            {tag?.tag}
                          </Text>
                        </Pressable>
                      );
                    } else if (index == 1) {
                      <Pressable
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.13)',
                          marginHorizontal: index !== 0 && 10,
                          borderRadius: 6,
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                        }}
                      >
                        <Text color="textOnPrimary" style={styles.tag}>
                          {`+${item.get_story_tags.length - 1}`}
                        </Text>
                      </Pressable>;
                    }
                  } else {
                    return (
                      <Pressable
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.13)',
                          marginHorizontal: index !== 0 && 10,
                          borderRadius: 6,
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                        }}
                      >
                        <Text color="textOnPrimary" style={styles.tag}>
                          {tag?.tag}
                        </Text>
                      </Pressable>
                    );
                  }
                })}
              </Box>
            </Box>
          </Box>
        </AnimatedBox>
      </Pressable>
    );
  };
  return (
    <Box style={styles.container}>
      <ScreenHeader
        onBackButtonPress={() => {
          navigation.pop();
        }}
        centerImg
        avatar={user?.profile_image}
        showBackButton
        marginTop={20}
        marginHorizontal={10}
        rightText={'Edit'}
      />
      <Box>
        <Box alignItems="center">
          <Text color="primary" style={styles.name}>
            {user?.first_name + ' ' + user?.last_name}
          </Text>
          <Text color="primary" style={styles.username}>
            {'@' + user?.username}
          </Text>
          <Text color="primary" style={styles.about}>
            {user?.about}
          </Text>
          <Pressable
            onPress={() => {
              Linking.openURL(user?.slug);
            }}
          >
            <Box flexDirection="row" marginVertical="xs">
              <Icon name="link-variant" size={20} />
              <Text color="primary" style={styles.link}>
                {user?.slug}
              </Text>
            </Box>
            {/* <Box flexDirection="row" marginVertical="m">
            <Image
              source={require('@assets/icons/followers.png')}
              style={styles.following}
            />
            <Text color="primary" style={styles.followers}>
              {user?.followers}
            </Text>
          </Box> */}
          </Pressable>
          <ButtonGroup
            onPress={index => {
              setSelectedIndex(index);
            }}
            selectedIndex={selectedIndex}
            buttons={buttons}
            selectedTextStyle={{ color: theme.colors.primary }}
            selectedButtonStyle={styles.selectedButton}
            textStyle={{ color: theme.colors.primary }}
            containerStyle={styles.buttonGroup}
          />
        </Box>
        {isLoading ? (
          <LoadingOverlay />
        ) : selectedIndex == 0 && data?.data?.stories.length > 0 ? (
          <FlatList
            data={
              selectedIndex == 0 ? data?.data?.stories : bookmarks.data.stories
            }
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <UserStory item={item} index={index} />
            )}
          />
        ) : (
          <Text>No Stories Found</Text>
        )}
      </Box>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
  name: {
    fontSize: 19,
    fontWeight: '500',
  },
  username: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 3,
  },
  link: {
    fontSize: 13,
    marginHorizontal: 4,
    fontWeight: '500',
  },
  selectedButton: {
    backgroundColor: theme.colors.textOnPrimary,
    borderRadius: 7,
  },
  tag: {
    marginHorizontal: 5,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
    color: theme.colors.primary,
  },
  about: { fontSize: 12, marginTop: 3 },
  following: {
    heigh: FOLLOWING_ICON_HEIGHT,
    width: FOLLOWING_ICON_WIDTH,
    resizeMode: 'contain',
  },
  storyAbout: {
    fontWeight: '500',
    fontSize: 13,
    marginTop: 2,
  },
  date: { fontSize: 12, fontWeight: '600', marginTop: 3 },
  followers: { alignSelf: 'center' },
  buttonGroup: {
    height: 30,
    width: '85%',
    borderRadius: 7,
    paddingHorizontal: 2,

    backgroundColor: 'rgba(118, 118, 128, 0.2)',

    marginVertical: 20,
  },
  storyTitle: { fontSize: 17, fontWeight: '700' },
});
