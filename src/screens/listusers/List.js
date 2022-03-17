import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useUser} from 'hooks';
import {Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');
import {redColor, blueColor, greenColor, whiteColor1} from 'utils/theme';

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
                    <Text style={styles.textWhite}>Recently Active</Text>
                  </View>
                </View>
                <Image
                  source={{uri: user.picture}}
                  style={[styles.iconPersion, styles.radius5, styles.box]}
                />
              </View>
              <View style={styles.height10} />
              <View style={[styles.spaceItem, styles.rowItem, styles.wrapBtn]}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={[
                      styles.borderCicle,
                      styles.borderRed,
                      styles.centerItem,
                    ]}>
                    <Icon name="close" type="font-awesome" color={redColor} />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={[
                      styles.borderCicle,
                      styles.borderBllue,
                      styles.centerItem,
                    ]}>
                    <Icon name="star" type="font-awesome" color={blueColor} />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={[
                      styles.borderCicle,
                      styles.borderGreen,
                      styles.centerItem,
                    ]}>
                    <Icon name="heart" type="font-awesome" color={greenColor} />
                  </View>
                </TouchableWithoutFeedback>
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
  centerItem: {alignItems: 'center', justifyContent: 'center'},
  height10: {height: 20},
  wrapBtn: {width: width - 20},
  spaceItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
    borderColor: whiteColor1,
  },
  textWhite: {
    color: whiteColor1,
  },
  textGreen: {
    color: greenColor,
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
  borderCicle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  borderGreen: {
    borderColor: greenColor,
  },
  borderBllue: {
    borderColor: blueColor,
  },
  borderRed: {
    borderColor: redColor,
  },
});

export default ListUsers;
