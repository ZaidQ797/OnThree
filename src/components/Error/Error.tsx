// import React, { useState, useEffect } from 'react';
// import { StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import Box from '../Box';
// import Text from '../Text';
// import FastImage from 'react-native-fast-image';

// type CustomError = {
//   title: string;
//   message?: string;
// };
// type Props = {
//   error: any;
//   customError?: CustomError;
// };

// const getError = (error: any): CustomError => {
//   let response = {
//     title: 'UNKNOWN_ERROR',
//     message: 'UNEXPECTED_ERROR',
//   };
//   if (error?.response) {
//     if (error.response.data && error.response.data.message) {
//       response.title = 'RESPONSE_ERROR';
//       response.message = error.response.data.message;
//     } else {
//       response.title = 'INTERNAL_SERVER_ERROR';
//       response.message = 'INTERNAL_SERVER_ERROR_MSG';
//     }
//   } else if (error?.request) {
//     response.title = 'NETWORK_ERROR';
//     response.message = 'NETWORK_ERROR_MSG';
//   }
//   return response;
// };
// const Error = ({ error, customError }: Props) => {
//   const { t } = useTranslation('backend');
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   useEffect(() => {
//     if (customError !== undefined) {
//       setTitle(customError.title);
//       setMessage(customError.message || '');
//     } else {
//       const err = getError(error);
//       setTitle(t(err.title));
//       setMessage(t(err.message || ''));
//     }
//   }, []);
//   return (
//     <Box flex={1} justifyContent="center" alignItems="center" padding="m">
//       <FastImage
//         source={require('assets/images/error.png')}
//         style={styles.image}
//       />
//       <Text marginTop="l" color="mainForeground" style={styles.title}>
//         {title}
//       </Text>
//       {message !== '' && (
//         <Text marginTop="m" style={styles.description}>
//           {message}
//         </Text>
//       )}
//     </Box>
//   );
// };

// export default Error;

// const styles = StyleSheet.create({
//   image: {
//     width: 221,
//     height: 201,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     textAlign: 'center',
//     letterSpacing: 1,
//   },
//   description: {
//     fontSize: 14,
//     fontWeight: '400',
//     textAlign: 'center',
//     letterSpacing: 0.7,
//     lineHeight: 22,
//   },
// });

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ErrorProps {}

const Error = (props: ErrorProps) => {
  return (
    <View style={styles.container}>
      <Text>Error</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {},
});
