import {useEffect, useState} from 'react';

import {
  User,
  useGetMeQuery,
  useUpdateUserMutation,
} from '../../shared/generated/types/graphql';

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>();
  const { data } = useGetMeQuery()
  const  [updateUser, { loading }] = useUpdateUserMutation()

  const actions = {
    getMe: async () => {
        if(data) {
            const user = data.getMe
            setUser(user)
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

  return {
    user,
    actions,
    loading
  };
};
