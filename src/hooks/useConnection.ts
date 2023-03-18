import NetInfo from '@react-native-community/netinfo';

export async function startConnectionWatcher() {
  return await NetInfo.isConnected.fetch();
}
