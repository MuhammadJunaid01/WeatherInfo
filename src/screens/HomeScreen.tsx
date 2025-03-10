/* eslint-disable react/no-unstable-nested-components */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useNetInfo} from '@react-native-community/netinfo';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, ScrollView, StatusBar, useColorScheme, View} from 'react-native';
import tw from '../../tailwind';
import {categories, countries} from '../assets';
import {ThemedInput, ThemedText, ThemedView} from '../components';
import AnimatedLoader from '../components/shared/AnimatedLoader';
import ApiError from '../components/shared/ApiError';
import ThemedButton from '../components/shared/ThemedButton';
import TopNewsHeadline from '../components/TopNewsHeadline';
import {COLORS, moderateScale, scale, screenWidth} from '../config/constants';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {useLazyGetNewsHeadLineQuery} from '../services/apis/newApiSlice';
import {setTheme} from '../services/features/themeSlice';
interface IModals {
  isCountryModalOPen: boolean;
  isCategoryModalOPen: boolean;
}
const initialModalState: IModals = {
  isCountryModalOPen: false,
  isCategoryModalOPen: false,
};
interface IHeadlineQuery {
  country: string;
  page: number;
  pageSize: number;
  search: string;
  category: string;
}
const initialHeadlineQuery: IHeadlineQuery = {
  country: 'us', // Example country
  page: 1,
  pageSize: 20,
  search: '',
  category: '',
};
const HomeScreen = () => {
  //netInfo
  const {isConnected} = useNetInfo();
  // ref
  const modalRef = useRef<BottomSheetModal>(null);
  const [modal, setModal] = useState<IModals>(initialModalState);
  const {articles} = useAppSelector(state => state.headline);
  const [headlineQuery, setHeadlineQuery] =
    useState<IHeadlineQuery>(initialHeadlineQuery);
  const [getHeadline, {data: headlineData, isLoading, error}] =
    useLazyGetNewsHeadLineQuery();
  const dispatch = useAppDispatch();
  const {activeTheme, theme} = useAppSelector(state => state.theme);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

  const systemTheme = useColorScheme();
  useEffect(() => {
    if (!activeTheme) {
      dispatch(
        setTheme({
          theme: systemTheme === 'dark' ? 'dark' : 'light',
          activeTheme: systemTheme === 'dark' ? 'dark' : 'light',
        }),
      );
    }
  }, [activeTheme, dispatch, systemTheme]);
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(
      isDarkMode ? COLORS.dark.primary : COLORS.light.primary,
    );
  }, [isDarkMode]);
  useEffect(() => {
    if (isConnected) {
      getHeadline({
        country: headlineQuery.country,
        page: 1,
        pageSize: headlineQuery.pageSize,
      });
    }
  }, [getHeadline, headlineQuery, isConnected]);
  const snapPoints = useMemo(() => ['10%', '40%', '86%'], []);

  const onPressModalHandle = useCallback((key: keyof IModals, val: boolean) => {
    // if (val) {
    //   modalRef.current?.present();
    // }
    setModal(prev => ({...prev, [key]: val}));
  }, []);
  const onHandleSource = useCallback(
    (key: keyof IHeadlineQuery, val: any) =>
      setHeadlineQuery(prev => ({...prev, [key]: val})),
    [],
  );
  const updateSearchQuery = useCallback(
    (query: string) => {
      onHandleSource('search', query);
    },
    [onHandleSource],
  );
  const filteredCountries = useMemo(() => {
    if (!headlineQuery.search) {
      return countries;
    }
    return countries.filter(
      country =>
        country.code.toLowerCase() === headlineQuery.search.toLowerCase(),
    );
  }, [headlineQuery.search]);
  const headline = useMemo(() => {
    if (!isConnected) {
      return {articles};
    }
    return headlineData && headlineData?.articles?.length > 0
      ? headlineData
      : null;
  }, [articles, headlineData, isConnected]);

  if (isLoading) {
    return (
      <ThemedView style={tw` flex-1`}>
        <AnimatedLoader
          height={6}
          backgroundColor="#F3F4F6"
          loaderColor="#10B981"
          duration={1000}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={tw` flex-1  p-3  gap-y-3`}>
      <View style={tw` flex-row items-center gap-x-3 flex-wrap w-full`}>
        <View style={tw` flex-1`}>
          <ThemedButton
            onPress={() => {
              modalRef.current?.present();
              onPressModalHandle('isCountryModalOPen', true);
            }}
            isDarkMode={isDarkMode}
            size="h4">
            Select Country
          </ThemedButton>
        </View>
        <View style={tw` flex-1`}>
          <ThemedButton
            onPress={() => {
              modalRef.current?.present();
              onPressModalHandle('isCategoryModalOPen', true);
            }}
            isDarkMode={isDarkMode}
            size="h4">
            Select Category
          </ThemedButton>
        </View>
      </View>
      {error && 'status' in error && error.status === 429 ? (
        <ApiError error={error} />
      ) : (
        headline &&
        headline?.articles?.length > 0 && (
          <View style={tw`   w-full`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {articles?.map((head, i) => {
                return (
                  <View
                    style={tw` h-[${scale(120)}px]  w-[${
                      screenWidth * 0.67
                    }px] mr-3`}
                    key={i}>
                    <TopNewsHeadline isDarkMode={isDarkMode} article={head} />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )
      )}

      <BottomSheetModal
        onChange={index => {
          if (index === -1) {
            setModal(initialModalState);
          }
        }}
        ref={modalRef}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        snapPoints={snapPoints}
        handleIndicatorStyle={tw` hidden  `}
        handleStyle={tw` ${isDarkMode ? `bg-[${COLORS.dark.primary}]` : ``}`}
        backdropComponent={props => <BottomSheetBackdrop {...props} />}
        index={2}>
        <ThemedView style={tw` flex-1 mt-4 p-4  `}>
          {modal.isCountryModalOPen && (
            <View style={tw` flex-1`}>
              <ThemedInput
                onChangeText={text => {
                  updateSearchQuery(text);
                }}
                isDarkMode={isDarkMode}
                iconName={'search'}
                iconSize={40}
                containerStyle={tw` top-[14px]`}
              />
              <BottomSheetScrollView
                style={tw` flex-1`}
                contentContainerStyle={tw` flex-grow pb-32`}
                contentInsetAdjustmentBehavior={'automatic'}>
                {filteredCountries.map(({code, flag}, i) => {
                  return (
                    <ThemedButton
                      isRenderView
                      isDarkMode={isDarkMode}
                      size="h5"
                      onPress={() => {
                        modalRef.current?.dismiss();
                        onHandleSource('country', code);
                      }}
                      style={tw``}
                      key={i}>
                      <View
                        style={tw` flex-row gap-x-3 justify-center items-center`}>
                        <ThemedText size="h4">{code.toUpperCase()}</ThemedText>
                        <Image
                          source={{uri: flag}}
                          style={tw` h-[${moderateScale(
                            20,
                          )}px] w-[${moderateScale(20)}px]`}
                          resizeMode="contain"
                        />
                      </View>
                    </ThemedButton>
                  );
                })}
              </BottomSheetScrollView>
            </View>
          )}
          {modal.isCategoryModalOPen && (
            <ThemedView style={tw`  flex-1`}>
              <BottomSheetScrollView contentContainerStyle={tw` flex-grow`}>
                {categories.map((category, i) => {
                  return (
                    <ThemedButton
                      isRenderView
                      isDarkMode={isDarkMode}
                      size="h5"
                      onPress={() => {
                        modalRef.current?.dismiss();
                        onHandleSource('category', category);
                      }}
                      style={tw``}
                      key={i}>
                      <View
                        style={tw` flex-row gap-x-3 justify-center items-center`}>
                        <ThemedText size="h4">
                          {category.toUpperCase()}
                        </ThemedText>
                      </View>
                    </ThemedButton>
                  );
                })}
              </BottomSheetScrollView>
            </ThemedView>
          )}
        </ThemedView>
      </BottomSheetModal>
      {/* <BottomModal
        heights={snapPoints}
        defaultIndex={2}
        iconStyle={tw` ${
          isDarkMode
            ? `text-[${COLORS.dark.secondary}] text-center text-[22px]`
            : ``
        }`}
        handleStyle={tw` ${isDarkMode ? `bg-[${COLORS.dark.primary}]` : ``}`}
        ref={modalRef}
        isUpDown={false}
        onCloseModal={() => setModal(initialModalState)}
        ModalBody={() => {
          return (
            <ThemedView style={tw` flex-1 mt-4 p-4  pb-11`}>
              {modal.isCountryModalOPen && (
                <View style={tw``}>
                  <ThemedInput
                    onChangeText={text => {
                      updateSearchQuery(text);
                    }}
                    isDarkMode={isDarkMode}
                    iconName={'search'}
                    iconSize={40}
                    containerStyle={tw` top-[14px]`}
                  />
                  {filteredCountries.map(({code, flag}, i) => {
                    return (
                      <ThemedButton
                        isRenderView
                        isDarkMode={isDarkMode}
                        size="h5"
                        onPress={() => {
                          modalRef.current?.dismiss();
                          onHandleSource('country', code);
                        }}
                        style={tw``}
                        key={i}>
                        <View
                          style={tw` flex-row gap-x-3 justify-center items-center`}>
                          <ThemedText size="h4">
                            {code.toUpperCase()}
                          </ThemedText>
                          <Image
                            source={{uri: flag}}
                            style={tw` h-[${moderateScale(
                              20,
                            )}px] w-[${moderateScale(20)}px]`}
                            resizeMode="contain"
                          />
                        </View>
                      </ThemedButton>
                    );
                  })}
                </View>
              )}
            </ThemedView>
          );
        }}
      /> */}
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
