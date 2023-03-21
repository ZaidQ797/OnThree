import React from 'react';
import { useQuery } from 'react-query';
import { AppService } from '@services';

const useUserStories = (token?: string, userId?: number) => {
  return useQuery(['userstories', token, userId], () =>
    AppService.getUserStories(token, userId),
  );
};

export default useUserStories;
