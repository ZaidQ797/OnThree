import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AppService } from '@services';

const useStoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (page: number, token?: string, userId?: number) =>
      AppService.getVideos(page, token, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('videos');
      },
    },
  );
};
export default useStoryMutation;
