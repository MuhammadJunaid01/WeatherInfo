/* eslint-disable react/no-unstable-nested-components */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {MutableRefObject, useMemo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewProps} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import tw from '../../../tailwind';
import ThemedText from './ThemedText';

interface IProps {
  onCloseModal?: () => void;
  ModalBody: React.ComponentType;
  heights?: string[];
  defaultIndex?: number;
  isUpDown?: boolean;
  isHorizontalScroll?: boolean;
  handleStyle?: StyleProp<ViewProps>;
}
const BottomModal = React.forwardRef<BottomSheetModal, IProps>(
  (
    {
      isHorizontalScroll = false,
      ModalBody,
      heights = ['25%', '50%', '70%', '85%'],
      defaultIndex = 1,
      onCloseModal,
      isUpDown = true,
      handleStyle,
    },
    ref,
  ) => {
    //   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // Define the snap points
    const snapPoints = useMemo(() => heights, [heights]);
    return (
      <BottomSheetModal
        ref={ref}
        onChange={index => {
          if (index === -1) {
            onCloseModal?.();
          }
        }}
        enablePanDownToClose={isUpDown}
        enableHandlePanningGesture={isUpDown}
        enableContentPanningGesture={isUpDown}
        index={defaultIndex}
        snapPoints={snapPoints}
        handleStyle={handleStyle}
        backdropComponent={props => <BottomSheetBackdrop {...props} />}
        handleIndicatorStyle={tw` hidden `}>
        <BottomSheetView style={tw`flex-1  bg-white`}>
          {!isUpDown ? null : (
            <>
              <Entypo
                name="chevron-thin-down"
                size={16}
                color="black"
                style={tw` text-center`}
              />
              <ThemedText
                size="h4"
                style={tw` text-center text-[14px] tracking-[1px]`}>
                Pull to close
              </ThemedText>
            </>
          )}

          <BottomSheetScrollView
            automaticallyAdjustKeyboardInsets
            horizontal={isHorizontalScroll}
            contentContainerStyle={tw` flex-grow`}
            keyboardShouldPersistTaps="handled">
            <ModalBody />
          </BottomSheetScrollView>
          {!isUpDown && (
            <View
              style={tw` h-12 w-12  absolute -top-4   right-3 items-center justify-center`}>
              <TouchableOpacity
                style={tw` h-12 w-12    items-center justify-center`}
                onPress={() => {
                  (
                    ref as MutableRefObject<BottomSheetModal>
                  )?.current?.dismiss();
                  onCloseModal?.();
                }}>
                <EvilIcons
                  name="close"
                  size={24}
                  style={tw` ${handleStyle ? ' text-white' : ' text-gray-700'}`}
                />
              </TouchableOpacity>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default React.memo(BottomModal);
