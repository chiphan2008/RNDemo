import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {useUser} from 'hooks';
import {getAgeFromUri} from 'utils/libs';
import {grayColor} from 'utils/theme';
import {ButtonIcon} from 'components/Button';
import {Icon} from 'react-native-elements';
import {NavigationService} from 'navigation';
import {common} from 'utils/common';

export const ListUsersFilter = ({route}) => {
  const {param} = route.params || null;
  const {onFilter} = useUser();
  const [listUsers, setListUsers] = useState([]);
  const getData = useCallback(async () => {
    const data = await onFilter(param);
    console.log('getData', data);
    setListUsers(data);
  }, [param]);

  useEffect(() => {
    getData();
  }, [param]);

  const renderItem = ({item}) => (
    <View style={[styles.rowItem, styles.pad10, styles.borderBottom]}>
      <Image source={{uri: item.picture}} style={styles.borderCicle} />
      <View style={styles.width20} />
      <View>
        <Text style={[styles.font18, styles.fontBold]}>
          {item.lastName} {item.fisrtName}
        </Text>
        <Text style={styles.font18}>Age: {getAgeFromUri(item.picture)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={[styles.pad10, styles.rowItem]}>
          <ButtonIcon
            icon={
              <View style={styles.rowItem}>
                <Icon name="chevron-left" type="font-awesome5" />
                <Text style={[styles.font18, styles.fontBold]}>
                  {common[param]}
                </Text>
              </View>
            }
            onPress={() => NavigationService.goBack()}
            style={[styles.borderRed, styles.centerItem]}
          />
        </View>
        <FlatList
          data={listUsers}
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  rowItem: {flexDirection: 'row'},
  pad10: {padding: 10},
  width20: {width: 20},
  borderCicle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: grayColor,
  },
  font18: {
    fontSize: 18,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});
