import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function navigate(name: never, params: never, count = 0) {
  if (navigationRef.isReady()) {
    // Perform navigation if the app has mounted
    navigationRef.navigate(name, params);
  } else {
    if (count < 5) {
      setTimeout(() => {
        navigate(name, params, ++count);
      }, 800);
    } else {
      __DEV__ && console.log('too mutch redirects');
    }
    // Hack should be implemented with implemented with action queue
  }
}

export default { navigate };
