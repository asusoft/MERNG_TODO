//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from '../../shared/generated/types/graphql';

type AvatarProps = {
  user: User,
  dimension: number,
  index: number
}

const COLORS = [
  "green",
  "blue",
  "purple",
  "grey",
  "pink"
]

const Avatar = ({ user, dimension, index }: AvatarProps) => {
  const ind = index % 4
  const bg = COLORS[ind]
  return (
    <View
      key={user?.id}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: dimension,
        width: dimension,
        borderRadius: dimension / 2,
        backgroundColor: bg
      }}
    >
      {
        user.avatar ? (
          <Image />
        ) : (
          <Text style={{ fontSize: dimension / 2 + 3, fontWeight: 'bold', color: 'white' }}>{user.name[0]?.toUpperCase()}</Text>
        )
      }
    </View>
  );
};

export default Avatar;
