/* eslint-disable react/no-unstable-nested-components */
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import tw from '../../../tailwind';
import BottomModal from './BottomModal';
import ThemedText from './ThemedText';

interface IProps {
  error: any;
}

const ApiError: React.FC<IProps> = ({error}) => {
  console.log('Error occurred:', error);

  const ref = useRef<BottomSheetModal>(null);

  const isRateLimited = error?.status === 429 || 426;
  const isServerError = error?.status >= 500 && error?.status < 600;
  const defaultErrorMessage = 'An unexpected error occurred. Please try again.';

  const errorMessage = (() => {
    if (isRateLimited) {
      return (
        error?.data?.message ||
        'You have made too many requests recently. Please try again later or upgrade to a paid plan for more requests.'
      );
    }
    if (isServerError) {
      return (
        error?.data?.message ||
        'A server error occurred. Please try again later.'
      );
    }
    return error?.data?.message || defaultErrorMessage;
  })();

  useEffect(() => {
    if (error) {
      ref.current?.present();
    }
  }, [error]);

  return (
    <BottomModal
      ref={ref}
      heights={['15%', '40%']}
      isUpDown={false}
      ModalBody={() => (
        <View style={tw`flex-1 `}>
          <View
            style={tw`items-center justify-center py-4 border-b border-gray-100`}>
            <ThemedText size="h2" style={tw`text-xl`}>
              Error Occurred
            </ThemedText>
          </View>

          <View style={tw`p-6`}>
            <View style={tw` p-4 rounded-xl border border-red-100`}>
              <ThemedText size="h5" style={tw`leading-6 text-red-400`}>
                {errorMessage}
              </ThemedText>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default ApiError;
