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

export default { getVideos };
