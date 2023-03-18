import appAxios from './appAxios';

const getVideos = async (token: any, userId: any, page: any) => {
  const formData = new FormData();
  formData.append('token', token);
  formData.append('user_id', userId);
  formData.append('page', page);
  return appAxios.post(`get-all-stories`, formData).then(response => {
    const { data } = response;
    return data;
  });
};

export default { getVideos };
