import {
  StackActions,
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const NavigationService = {
  goBack: () => navigationRef.current?.goBack(),
  route: navigationRef.current?.getCurrentRoute(),
  navigate: (name, params) => navigationRef.current?.navigate(name, params),
  replace: (name, params) =>
    navigationRef.current?.dispatch(StackActions.replace(name, params)),
  reset: (name, params) =>
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      }),
    ),
};
