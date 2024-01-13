import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, TextInput } from 'react-native';
import icons from '../../icons';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useUser } from '../../entities/user/use-user';
import Avatar from '../../components/Avatar';


const UserEditScreen = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { user, actions } = useUser()
    const [editName, setEditName] = useState(false)
    const [newName, setName] = useState(user?.name);

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        setName(user?.name);
    }, [user]);

    const callEditName = async () => {
        if (editName) {
            // await actions.updateTask(newName);
            setEditName(false);
            if (inputRef.current) {
                inputRef.current?.blur();
            }
        } else {
            setEditName(true);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 20 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 30, tintColor: 'white' }}
                    />
                </Pressable>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar user={user} dimension={120} index={2} />
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <TextInput
                            ref={inputRef}
                            style={styles.title}
                            value={newName}
                            placeholder={'Title'}
                            onChangeText={setName}
                            placeholderTextColor={'grey'}
                            maxLength={15}
                        />
                        <Pressable
                            onPress={callEditName}
                            style={{ marginLeft: 5, justifyContent: 'center' }}>
                            <Image
                                source={editName ? icons.done : icons.edit}
                                style={{
                                    height: 25,
                                    width: 30,
                                    tintColor: 'white',
                                    resizeMode: 'contain',
                                }}
                            />
                        </Pressable>
                    </View>
                    <Pressable style={{ bottom: 50, right: 120, width: 30, height: 30, borderRadius: 15, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                       <Image source={icons.camera} style={{ height: 15, width: 15, tintColor: 'white'}} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15202b',
    },
    title: {
        color: 'white',
        fontSize: 29,
        fontWeight: 'bold',
        marginLeft: 20,
    },
});


export default UserEditScreen;
