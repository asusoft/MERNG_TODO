import {useEffect, useState} from 'react';

import {
  BaseError,
  User,
  useGetMeQuery,
  useUpdateUserMutation,
} from '../../shared/generated/types/graphql';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';

export const useUser = () => {
  const [user, setUser] = useState<User>();
  const { data } = useGetMeQuery()
  const  [updateUser, { loading }] = useUpdateUserMutation()
  const isFocused = useIsFocused()

  const actions = {
    getMe: async () => {
        if(data) {
          if(data.getMe.__typename === 'User') {
            const me = data.getMe
            setUser(me)
          } else if(data.getMe.__typename === 'BaseError') {
            Alert.alert(data.getMe.status)
          }
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
