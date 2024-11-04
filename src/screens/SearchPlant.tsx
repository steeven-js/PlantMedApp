import React, { useState, useRef, useEffect } from 'react';

import { View, Text, FlatList, Platform, TextInput, TouchableOpacity } from 'react-native';

import { useTextChangeHandler } from '@src/utils/handleTextChange';

import { hooks } from '../hooks';
import { custom } from '../custom';
import { svg } from '../assets/svg';
import { theme } from '../constants';
import { components } from '../components';
import PremiumSvg from '../assets/svg/PremiumSvg';
import { usePlantPress } from '../hooks/useCommonNav';

import { PlantType } from '@src/types';
import { usePlantData } from '@src/hooks/useData';

const SearchPlant: React.FC = () => {
  const handlePlantPress = usePlantPress();
  const navigation = hooks.useAppNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { plants, hasData } = usePlantData();

  const ref = useRef<TextInput>(null);

  const handleSearch = useTextChangeHandler(setSearchQuery);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const renderSearchBar = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: `${theme.colors.antiFlashWhite}80`,
        }}
      >
        <View style={{ flex: 1, height: 40, marginRight: 20 }}>
          <TextInput
            ref={ref}
            placeholder="Rechercher une plante"
            clearButtonMode="always"
            placeholderTextColor={`${theme.colors.textColor}80`}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            value={searchQuery}
            onChangeText={text => handleSearch(text)}
            style={{
              height: 40,
              padding: 0,
              borderRadius: 4,
              paddingHorizontal: 20,
              fontSize: Platform.OS === 'ios' ? 18 : 16,
              backgroundColor: `${theme.colors.antiFlashWhite}50`,
              color: theme.colors.textColor,
              ...theme.fonts.DM_Sans_400Regular,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: theme.colors.textColor,
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 18 : 16,
            }}
          >
            Annuler
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: PlantType; index: number }) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: `${theme.colors.antiFlashWhite}80`,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        onPress={() => handlePlantPress(item)}
      >
        <svg.SearchSmallSvg />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {/* IMAGE */}
              <custom.ImageBackground
                source={item.image}
                style={{ width: 50, height: 50 }}
                imageStyle={{
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  backgroundColor: theme.colors.imageBackground,
                }}
                resizeMode="contain"
               />

              <Text
                style={{
                  marginLeft: 10,
                  color: theme.colors.textColor,
                  ...theme.fonts.DM_Sans_400Regular,
                  fontSize: Platform.OS === 'ios' ? 20 : 18,
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {item.is_premium && Platform.OS === 'ios' ? (
              <PremiumSvg
                width="40px"
                height="40px"
                fillColor={theme.colors.yellowStar}
                strokeColor={theme.colors.yellowStar}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            ...theme.fonts.DM_Sans_400Regular,
            fontSize: Platform.OS === 'ios' ? 16 : 14,
            color: theme.colors.textColor,
          }}
        >
          No results found
        </Text>
      </View>
    );
  };

  const renderSearchResults = () => {
    const filteredProducts = plants?.filter(item => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <FlatList
        data={filteredProducts}
        keyExtractor={(item: PlantType) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // when user taps on the screen, the keyboard will be hidden
        keyboardDismissMode="on-drag" // when user drags the screen, the keyboard will be hidden
        ListEmptyComponent={() => renderEmptyComponent()}
        renderItem={({ item, index }) => renderItem({ item, index })}
      />
    );
  };

  const renderContent = () => {
    if (!hasData) {
      return <components.Loader />;
    }

    return (
      <React.Fragment>
        {renderSearchBar()}
        {renderSearchResults()}
      </React.Fragment>
    );
  };

  return (
    <custom.ImageBackground
      style={{ flex: 1 }}
      resizeMode="stretch"
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{ backgroundColor: theme.colors.transparent }}
      >
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default SearchPlant;
