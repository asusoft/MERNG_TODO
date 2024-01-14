import {useEffect, useState} from 'react';

import {
  User,
  useGetMeQuery,
  useUpdateUserMutation,
} from '../../shared/generated/types/graphql';
import { useIsFocused } from '@react-navigation/native';

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>();
  const { data } = useGetMeQuery()
  const  [updateUser, { loading }] = useUpdateUserMutation()
  const isFocused = useIsFocused()

  const actions = {
    getMe: async () => {
        if(data) {
            const me = data.getMe
            setUser(me)
        }
    },
    updateMe: async (name?: string, avatar?: string | null) => {
      const response = await updateUser({variables: {name, avatar}})

      if(response.data){
        const updatedUser = response.data.updateUser
        setUser(updatedUser)
      }
    }
    
  };

  useEffect(() => {
    actions.getMe();
  }, [data]);

  useEffect(() => {
    if(isFocused){
      actions.getMe();
    }
  }, [isFocused]);

  return {
    user,
    actions,
    loading
  };
};
