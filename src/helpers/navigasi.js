import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function backNavigate() {
  _navigator.dispatch(
    NavigationActions.back()
  )
}

function resetNavigasi(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName, params })]
    })
  )
}

function previousStack(n) {
  _navigator.dispatch(
    StackActions.pop({ n })
  )
}

export {
  navigate,
  resetNavigasi,
  backNavigate,
  setTopLevelNavigator,
  previousStack,
}