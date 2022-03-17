import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUser} from 'hooks';

const ListUsers = () => {
  const {onFetch} = useUser();
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const {data} = await onFetch();
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      setListUsers(data);
    };
    getData();
  }, []);

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {listUsers.length > 0 &&
          listUsers.map(user => (
            <Text key={user.id}>
              {user.title.toUpperCase()} {user.firstName} {user.lastName}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
};

export default ListUsers;
