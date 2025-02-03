/* eslint-disable react/no-unstable-nested-components */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StatusBar, useColorScheme, View} from 'react-native';
import tw from '../../tailwind';
import {ThemedInput, ThemedText, ThemedView} from '../components';
import AnimatedLoader from '../components/shared/AnimatedLoader';
import ThemedButton from '../components/shared/ThemedButton';
import TopNewsHeadline from '../components/TopNewsHeadline';
import {COLORS, screenWidth} from '../config/constants';
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
  search: string;
}
const initialHeadlineQuery: IHeadlineQuery = {
  country: 'us', // Example country
  page: 1,
  pageSize: 5,
  search: '',
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
  const countries = useMemo(() => {
    if (sourcesData?.sources && sourcesData.sources.length > 0) {
      return sourcesData?.sources.map(source => source.country);
    }
  }, [sourcesData]);
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
  console.log('sources', sourcesData?.sources);
  const snapPoints = useMemo(() => ['10%', '40%', '76%'], []);

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
    return (countries ?? []).filter(
      country => country.toLowerCase() === headlineQuery.search.toLowerCase(),
    );
  }, [countries, headlineQuery.search]);
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
      <BottomSheetModal
        ref={modalRef}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        snapPoints={snapPoints}
        handleIndicatorStyle={tw` hidden  `}
        handleStyle={tw` ${isDarkMode ? `bg-[${COLORS.dark.primary}]` : ``}`}
        backdropComponent={props => <BottomSheetBackdrop {...props} />}
        index={2}>
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
              <BottomSheetScrollView
                contentContainerStyle={tw` flex-grow`}
                contentInsetAdjustmentBehavior={'automatic'}>
                {filteredCountries?.map((country, i) => {
                  return (
                    <ThemedButton
                      isRenderView
                      isDarkMode={isDarkMode}
                      size="h5"
                      onPress={() => {
                        modalRef.current?.dismiss();
                        onHandleSource('country', country);
                      }}
                      style={tw``}
                      key={i}>
                      <View
                        style={tw` flex-row gap-x-3 justify-center items-center`}>
                        <ThemedText size="h4">
                          {country.toUpperCase()}
                        </ThemedText>
                      </View>
                    </ThemedButton>
                  );
                })}
              </BottomSheetScrollView>
            </View>
          )}
        </ThemedView>
      </BottomSheetModal>
    </ThemedView>
  );
};

export default React.memo(HomeScreen);
