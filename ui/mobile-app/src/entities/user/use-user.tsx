import {useEffect, useState} from 'react';

import {
  User,
  useGetMeQuery,
} from '../../shared/generated/types/graphql';

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>();
  const { data, loading, error} = useGetMeQuery()

  const actions = {
    getMe: async () => {
        if(data) {
            const user = data.getMe
            setUser(user)
        }
    }
    
  };

  useEffect(() => {
    actions.getMe();
  }, [data]);

  return {
    user,
    actions,
  };
};
