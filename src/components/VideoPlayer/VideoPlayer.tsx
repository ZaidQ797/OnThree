import { useMaterialNavBarHeight } from '@hooks';
import React, { useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Video from 'react-native-video';
const feedItemHeight =
  Dimensions.get('window').height -
  useMaterialNavBarHeight(Dimensions.get('window').height);

const VideoPlayer = ({ item, index, mediaRefs }: any) => {
  const [paused, setpaused] = useState(true);
  const [indexx, setIndex] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)}
        source={{
          uri: item.url,
        }}
        style={styles.video}
        onError={e => console.log(e)}
        resizeMode={'cover'}
        repeat={true}
        muted
      >
        <Image source={require('@assets/icons/play.png')} style={styles.play} />
      </Video>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: feedItemHeight,
    backgroundColor: 'black',
  },
  videoPlayer: {
    width: '100%',
    zIndex: 2,
    flex: 1,
  },
  play: {
    position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },

  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,

    right: 0,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  handle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },

  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#4c4c4c',
  },

  //  right container
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },

  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});
