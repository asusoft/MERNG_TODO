import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { User } from '../../../shared/generated/types/graphql';
import Avatar from '../../Avatar';

type AddUserModalProps = {
    users: User[] | undefined,
    onAdd?: (id: string) => void
    onRemove?: (id: string) => void
}

const UsersList = ({ users, onAdd, onRemove }: AddUserModalProps) => {
    return (
        <FlatList
            data={users}
            renderItem={({ item, index }) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <Avatar user={item} dimension={25} index={index} />
                    <Text style={{ fontSize: 18, color: 'white', marginLeft: 10, marginRight: 8 }}>{item.name.split(' ')[0]}</Text>
                    { onAdd && <Pressable onPress={() => onAdd(item.id)} style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, height: 25, backgroundColor: '#e33062', marginLeft: "auto", borderRadius: 8, alignSelf: 'flex-end' }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Add</Text>
                    </Pressable>}
                    { onRemove && <Pressable onPress={() => onRemove(item.id)} style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, height: 25, backgroundColor: '#e33062', marginLeft: "auto", borderRadius: 8, alignSelf: 'flex-end' }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Remove</Text>
                    </Pressable>}
                </View>
            )}
            contentContainerStyle={{
                padding: 20,
                gap: 5
            }}
            ListEmptyComponent={
                <View>
                    <Text style={{ fontSize: 14, color: 'white' }}> </Text>
                </View>
            }
        />
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});


export default UsersList;
