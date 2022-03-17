import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useUser} from 'hooks';
const {width, height} = Dimensions.get('window');
// const WIDTH = Dimensions.get(window).width;
// const HEIGHT = Dimensions.get(window).height;

const ListUsers = () => {
  const {onFetch} = useUser();
  const [listUsers, setListUsers] = useState([]);

  const getData = useCallback(async () => {
    const {data} = await onFetch();
    setListUsers(data);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // const renderItem = user => (
  //   <View key={user.id}>
  //     <Image
  //       source={user.picture}
  //       style={[styles.iconPersion, styles.radius5]}
  //     />
  //     <View style={styles.overlay}>
  //       <Text>
  //         {user.title.toUpperCase()} {user.firstName} {user.lastName}
  //       </Text>
  //     </View>
  //   </View>
  // );

  return (
    <>
      <View style={[styles.container, styles.lrPadding]}>
        {listUsers.length > 0 &&
          listUsers.map(user => (
            <View key={user.id} style={styles.wrapOverlay}>
              <View style={[styles.box, styles.reverseCol]}>
                <View style={styles.overlay}>
                  <Text
                    style={[styles.textWhite, styles.font18, styles.fontBold]}>
                    {user.lastName}
                  </Text>
                  <View style={[styles.rowItem, styles.centerItem]}>
                    <Text
                      style={[
                        styles.textGreen,
                        styles.font24,
                        styles.fontBold,
                      ]}>
                      {'• '}
                    </Text>
                    <Text style={[styles.textWhite]}>Recently Active</Text>
                  </View>
                </View>
                <Image
                  source={{uri: user.picture}}
                  style={[styles.iconPersion, styles.radius5, styles.box]}
                />
              </View>
            </View>
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  rowItem: {flexDirection: 'row'},
  centerItem: {alignItems: 'center'},
  lrPadding: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  box: {
    width: width - 20,
    height: height - 200,
  },
  iconPersion: {
    resizeMode: 'cover',
  },
  wrapOverlay: {
    width,
    height,
  },
  reverseCol: {
    flexDirection: 'column-reverse',
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    left: 15,
  },
  radius5: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  textWhite: {
    color: '#f5f5f5',
  },
  textGreen: {
    color: 'green',
  },
  font18: {
    fontSize: 18,
  },
  font24: {
    fontSize: 24,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});

export default ListUsers;
