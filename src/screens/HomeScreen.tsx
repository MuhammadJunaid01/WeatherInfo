/* eslint-disable react/no-unstable-nested-components */
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, ScrollView, StatusBar, useColorScheme, View} from 'react-native';
import tw from '../../tailwind';
import {countries} from '../assets';
import {BottomModal, ThemedText, ThemedView} from '../components';
import AnimatedLoader from '../components/shared/AnimatedLoader';
import ThemedButton from '../components/shared/ThemedButton';
import TopNewsHeadline from '../components/TopNewsHeadline';
import {COLORS, moderateScale, screenWidth} from '../config/constants';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {
  useGetNewsSourcesQuery,
  useLazyGetNewsHeadLineQuery,
} from '../services/apis/newApiSlice';
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
}
const initialHeadlineQuery: IHeadlineQuery = {
  country: 'us', // Example country
  page: 1,
  pageSize: 5,
};
const HomeScreen = () => {
  // ref
  const modalRef = useRef<BottomSheetModal>(null);
  const [modal, setModal] = useState<IModals>(initialModalState);
  const [headlineQuery, setHeadlineQuery] =
    useState<IHeadlineQuery>(initialHeadlineQuery);
  const [getHeadline, {data: headline, isLoading}] =
    useLazyGetNewsHeadLineQuery();
  const {data: sourcesData} = useGetNewsSourcesQuery({category: 'general'});
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
    getHeadline({
      country: headlineQuery.country,
      page: 1,
      pageSize: 5,
    });
  }, [getHeadline, headlineQuery]);
  console.log('sources', sourcesData?.sources[0]);
  const snapPoints = useMemo(() => ['10%', '40%', '66%'], []);
  const onPressModalHandle = useCallback(
    (key: keyof IModals, val: boolean) => {
      if (val) {
        modalRef.current?.present();
      }
      setModal(prev => ({...prev, [key]: val}));
    },
    [modalRef],
  );
  const onHandleSource = useCallback(
    (key: keyof IHeadlineQuery, val: any) =>
      setHeadlineQuery(prev => ({...prev, [key]: val})),
    [],
  );
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
            onPress={() => onPressModalHandle('isCountryModalOPen', true)}
            isDarkMode={isDarkMode}
            size="h4">
            Select Country
          </ThemedButton>
        </View>
        <View style={tw` flex-1`}>
          <ThemedButton
            onPress={() => onPressModalHandle('isCategoryModalOPen', true)}
            isDarkMode={isDarkMode}
            size="h4">
            Select Category
          </ThemedButton>
        </View>
      </View>
      {headline && headline.articles.length > 0 && (
        <View style={tw`   w-full`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {headline.articles.map((head, i) => {
              return (
                <View style={tw` w-[${screenWidth * 0.67}px] mr-3`} key={i}>
                  <TopNewsHeadline isDarkMode={isDarkMode} article={head} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      <BottomModal
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
            <ThemedView style={tw` flex-1 mt-4 p-4 pb-11`}>
              {modal.isCountryModalOPen && (
                <View>
                  {countries.map(({code, flag}, i) => {
                    return (
                      <ThemedButton
                        isRenderView
                        isDarkMode={isDarkMode}
                        size="h5"
                        onPress={() => {
                          modalRef.current?.dismiss();
                          onHandleSource('country', code);
                        }}
                        style={tw` w-[${screenWidth * 0.8}px] mx-auto`}
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
      />
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
