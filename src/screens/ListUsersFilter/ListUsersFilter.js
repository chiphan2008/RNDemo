import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {useUser} from 'hooks';
import {getAgeFromUri} from 'utils/linbs';

export const ListUsersFilter = ({route}) => {
  const {param} = route.params || null;
  const {onFilter} = useUser();
  const [listUsers, setListUsers] = useState([]);
  const getData = useCallback(async () => {
    const {data} = await onFilter(param);
    setListUsers(data);
  }, [param]);

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.rowItem}>
      <Image source={{uri: item.picture}} style={styles.borderCicle} />
      <View>
        <Text style={[styles.font18, styles.fontBold]}>
          {item.lastName} {item.fisrtName}
        </Text>
        <Text style={[styles.font18, styles.fontBold]}>
          Age: {getAgeFromUri(item.picture)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View>
        <Text>ListLiked</Text>
        <FlatList
          data={listUsers}
          horizontal
          disableScrollViewPanResponder
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowItem: {flexDirection: 'row'},
  borderCicle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  font18: {
    fontSize: 18,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});
