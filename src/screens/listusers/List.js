import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useUser} from 'hooks';
import {Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');
import {redColor, blueColor, greenColor, whiteColor1} from 'utils/theme';
import * as Animatable from 'react-native-animatable';

const ListUsers = () => {
  const {onFetch} = useUser();
  const imgRef = useRef({});
  const activeRef = useRef({});
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hideBox, setHideBox] = useState({});

  const getData = useCallback(async () => {
    const {data} = await onFetch(page);
    setListUsers(data);
  }, [page]);

  useEffect(() => {
    getData();
  }, [page]);

  const setAnimation = id => {
    if (activeRef.current !== id) {
      activeRef.current = id;
      imgRef.current[id].lightSpeedOut();
      const listUsersfilltered = listUsers.filter(user => user.id !== id);
      if (listUsersfilltered.length === 0) {
        setPage(p => p + 1);
      }

      setTimeout(() => {
        if (listUsersfilltered.length > 0) {
          hideBox[id] = true;
          setHideBox(hideBox);
          setListUsers(listUsersfilltered);
        }
      }, 300);
    }
  };

  return (
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
                duration={100}
                ref={r => (imgRef.current[user.id] = r)}
                style={[styles.box, styles.reverseCol]}>
                <View style={[styles.overlay, styles.textPositionOverlay]}>
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
              </Animatable.View>
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
                <TouchableWithoutFeedback onPress={() => setAnimation(user.id)}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {width, height},
  rowItem: {flexDirection: 'row'},
  hiddenItem: {display: 'none'},
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

export default ListUsers;
