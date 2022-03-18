import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useUser} from 'hooks';
import {Icon} from 'react-native-elements';
import {ButtonIcon} from 'components/Button';
const {width, height} = Dimensions.get('screen');
import {
  redColor,
  blueColor,
  greenColor,
  whiteColor1,
  whiteColor,
  grayColor,
} from 'utils/theme';
import {ACTION_ANIMATION, KEY_STORE} from 'utils/constants';
import {getAgeFromUri, setItem} from 'utils/libs';
import * as Animatable from 'react-native-animatable';
import {NavigationService, Routes} from 'navigation';

export const ListUsers = () => {
  const {onFetch} = useUser();
  const imgRef = useRef({});
  const likedRef = useRef({});
  const passedRef = useRef({});
  const activeRef = useRef({});
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hideBox, setHideBox] = useState({});

  const getData = useCallback(async () => {
    // console.log('getData', page);
    // console.log('getAgeFromUri()', getAgeFromUri());
    const {data} = await onFetch(page);
    setListUsers(data);
  }, [page]);

  useEffect(() => {
    getData();
  }, [page]);

  const setAnimation = (item, type) => {
    // bounceOutLeft
    const id = item.id;
    if (activeRef.current !== id) {
      activeRef.current = id;
      switch (type) {
        case ACTION_ANIMATION[1]:
          imgRef.current[id].fadeOutUpBig();
          break;
        case ACTION_ANIMATION[2]:
          likedRef.current[id] = item;
          setItem(KEY_STORE.likedUsers, likedRef.current);
          imgRef.current[id].lightSpeedOut();
          break;
        default:
          passedRef.current[id] = item;
          setItem(KEY_STORE.passedUsers, passedRef.current);
          imgRef.current[id].bounceOutLeft();
          break;
      }
      const listUsersfilltered = listUsers.filter(user => user.id !== id);
      // console.log('listUsersfilltered', listUsersfilltered.length);
      if (listUsersfilltered.length === 0) {
        setPage(p => p + 1);
      }

      setTimeout(() => {
        if (listUsersfilltered.length > 0) {
          hideBox[id] = true;
          setHideBox(hideBox);
          setListUsers(listUsersfilltered);
        }
      }, 500);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container, styles.lrPadding]}>
          {listUsers.length > 0 &&
            listUsers.map(user => (
              <View
                key={user.id}
                style={[
                  styles.wrapOverlay,
                  styles.overlay,
                  hideBox[user.id] ? styles.hiddenItem : {},
                ]}>
                <Animatable.View
                  duration={300}
                  ref={r => (imgRef.current[user.id] = r)}
                  style={[styles.box, styles.reverseCol]}>
                  <View style={[styles.overlay, styles.textPositionOverlay]}>
                    <Text
                      style={[
                        styles.textWhite,
                        styles.font18,
                        styles.fontBold,
                      ]}>
                      {user.lastName} {getAgeFromUri(user.picture)}
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
                </Animatable.View>
                <View style={styles.height10} />
                <View
                  style={[styles.spaceItem, styles.rowItem, styles.wrapBtn]}>
                  <ButtonIcon
                    icon={
                      <Icon name="close" type="font-awesome" color={redColor} />
                    }
                    onPress={() => setAnimation(user, ACTION_ANIMATION[0])}
                    style={[
                      styles.borderCicle,
                      styles.borderRed,
                      styles.centerItem,
                    ]}
                  />
                  <ButtonIcon
                    icon={
                      <Icon name="star" type="font-awesome" color={blueColor} />
                    }
                    onPress={() => setAnimation(user, ACTION_ANIMATION[1])}
                    style={[
                      styles.borderCicle,
                      styles.borderBllue,
                      styles.centerItem,
                    ]}
                  />
                  <ButtonIcon
                    icon={
                      <Icon
                        name="heart"
                        type="font-awesome"
                        color={greenColor}
                      />
                    }
                    onPress={() => setAnimation(user, ACTION_ANIMATION[2])}
                    style={[
                      styles.borderCicle,
                      styles.borderGreen,
                      styles.centerItem,
                    ]}
                  />
                </View>
              </View>
            ))}
          <View style={[styles.overlay, styles.bottomBar, styles.pad10]}>
            <View
              style={[styles.centerItem, styles.rowItem, styles.wrapBottomBar]}>
              <View style={[styles.rowItem, styles.centerItem]}>
                <ButtonIcon
                  icon={
                    <Icon name="close" type="font-awesome" color={redColor} />
                  }
                  onPress={() =>
                    NavigationService.navigate(Routes.ListUsersFilter, {
                      param: KEY_STORE.passedUsers,
                    })
                  }
                  // style={[styles.borderRed, styles.centerItem]}
                />
                <Text style={[styles.textWhite, styles.fontBold]}>
                  {' Second Look'}
                </Text>
              </View>
              <View style={styles.width20} />
              <View style={styles.width20} />
              <View style={[styles.rowItem, styles.centerItem]}>
                <ButtonIcon
                  icon={
                    <Icon name="heart" type="font-awesome" color={redColor} />
                  }
                  onPress={() =>
                    NavigationService.navigate(Routes.ListUsersFilter, {
                      param: KEY_STORE.likedUsers,
                    })
                  }
                  // style={[styles.borderRed, styles.centerItem]}
                />
                <Text style={[styles.textWhite, styles.fontBold]}>
                  {' Liked List'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {width, height, backgroundColor: whiteColor},
  rowItem: {flexDirection: 'row'},
  hiddenItem: {display: 'none'},
  bottomBar: {bottom: 77, zIndex: 2, backgroundColor: grayColor},
  wrapBottomBar: {width},
  centerItem: {alignItems: 'center', justifyContent: 'center'},
  height10: {height: 10},
  width20: {width: 20},
  wrapBtn: {width: width - 20},
  spaceItem: {
    justifyContent: 'space-between',
  },
  pad10: {padding: 10},
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
    left: 10,
  },
  reverseCol: {
    flexDirection: 'column-reverse',
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
  },
  textPositionOverlay: {
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
