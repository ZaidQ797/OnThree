import appAxios from './appAxios';

const getVideos = async (page: any, token: any, userId: any) => {
  const formData = new FormData();
  token && formData.append('token', token);
  userId && formData.append('user_id', userId);
  formData.append('page', page);

  return appAxios.post(`get-all-stories`, formData).then(response => {
    const { data } = response;

    return data;
  });
};

const getUserStories = async (token: string, userId: number) => {
  const formData = new FormData();
  token && formData.append('token', token);
  userId && formData.append('user_id', userId);
  formData.append('story_user_id', userId);

  return appAxios.post(`get-user-all-stories`, formData).then(response => {
    const { data } = response;
    __DEV__ && console.log(data, 'USER STORIES');

    return data;
  });
};
const getUserBookmarks = async (token: string, userId: number) => {
  const formData = new FormData();
  token && formData.append('token', token);
  userId && formData.append('user_id', userId);

  return appAxios.post(`get-user-bookmark-stories`, formData).then(response => {
    const { data } = response;
    __DEV__ && console.log(data, 'USER BOOKMARKS');

    return data;
  });
};
const likeStory = async (
  liked: number,
  storyId: number,
  token: any,
  userId: number,
) => {
  const formData = new FormData();
  formData.append('token', token);
  formData.append('user_id', userId);
  formData.append('liked', liked);
  formData.append('story_id', storyId);

  return appAxios.post(`add-likes`, formData).then(response => {
    const { data } = response;
    return data;
  });
};
export default { getVideos, likeStory, getUserStories, getUserBookmarks };
