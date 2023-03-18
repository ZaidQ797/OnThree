import { LoadingOverlay, VideoPlayer } from '@components';
import { useAppSelector } from '@hooks';
import { KeychainService } from '@services';
import useVideos from 'hooks/useVideos';
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';

const Home = () => {
  const [posts, setPosts] = useState([
    { url: 'https://www.w3schools.com/html/mov_bbb.mp4', id: 0 },
    {
      id: 1,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 2,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 3,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: 4,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
  ]);
  const [page, setPage] = useState(1);
  const { token, user } = useAppSelector(state => state.auth);
  const { data, isLoading, isError, error } = useVideos(token, user?.id, page);
  const mediaRefs = useRef([]);
  // console.log(data?.data?.user.data);
  const onViewableItemsChanged = useRef(({ changed }: any) => {
    changed.forEach((element: any) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          // cell?.play();
        } else {
          // cell?.pause();
        }
      }
    });
  });
  return (
    <View>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <FlatList
          data={posts}
          windowSize={4}
          initialNumToRender={0}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          viewabilityConfig={{
            itemVisiblePercentThreshold: 0,
          }}
          renderItem={({ item, index }) => (
            <VideoPlayer item={item} index={index} mediaRefs={mediaRefs} />
          )}
          pagingEnabled
          keyExtractor={item => item?.url}
          decelerationRate={'normal'}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
        // <FlatList
        //   data={posts}
        //   renderItem={({ item, index }) => (
        //     <VideoPlayer item={item} index={index} />
        //   )}
        //   showsVerticalScrollIndicator={false}
        //   snapToInterval={Dimensions.get('window').height}
        //   snapToAlignment={'start'}
        //   decelerationRate={'fast'}
        // />
      )}
    </View>
  );
};

export default Home;
