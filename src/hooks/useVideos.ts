import React from 'react';
import { useQuery } from 'react-query';
import { AppService } from '@services';

const useVideos = (page: number, token?: string, userId?: number) => {
  return useQuery(['videos', token, userId, page], () =>
    AppService.getVideos(page, token, userId),
  );
};

export default useVideos;
