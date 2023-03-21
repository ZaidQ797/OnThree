import React from 'react';
import { useQuery } from 'react-query';
import { AppService } from '@services';

const useBookMarks = (token?: string, userId?: number) => {
  return useQuery(['bookmarks', token, userId], () =>
    AppService.getUserBookmarks(token, userId),
  );
};

export default useBookMarks;
