import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';

const VideoPlayer = ({
  item,
  index,
  activePage,
  isPaused,
  onLoad,
  onLoadStart,
  onBuffer,
}: any) => {
  const toast = useToast();
  return (
    <Video
      key={index}
      poster={item.poster}
      source={{ uri: convertToProxyURL(item.url) }}
      posterResizeMode="cover"
      resizeMode={'cover'}
      ignoreSilentSwitch={'obey'}
      style={styles.video}
      repeat
      paused={activePage != index || isPaused}
      onBuffer={onBuffer}
      onLoadStart={onLoadStart}
      onLoad={onLoad}
      onVideoError={() => {
        toast.show('Video is not supported', { type: 'danger' });
      }}
    />
  );
};
export default VideoPlayer;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
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
