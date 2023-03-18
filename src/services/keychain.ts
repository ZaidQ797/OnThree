import * as Keychain from 'react-native-keychain';

import { KeychainCredentials } from './types';

export const saveCredentials = async (credentials: KeychainCredentials) => {
  await Keychain.setGenericPassword('tokens', JSON.stringify(credentials));
};

export const getCredentials = async (): Promise<KeychainCredentials | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const tokens = JSON.parse(credentials.password) as KeychainCredentials;
      return tokens;
    }
    return null;
  } catch (error) {
    __DEV__ && console.log('Unable to retrive credetials', error);
    return null;
  }
};

export const resetCredentials = async () => {
  await Keychain.resetGenericPassword();
};

export default { saveCredentials, getCredentials, resetCredentials };
