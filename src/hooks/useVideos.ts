import React from 'react';
import { useQuery } from 'react-query';
import { AppService } from '@services';

const useVideos = (token: string, userId: number, page: number) => {
  return useQuery(['videos', token, userId, page], () =>
    AppService.getVideos(token, userId, page),
  );
};

export default useVideos;
