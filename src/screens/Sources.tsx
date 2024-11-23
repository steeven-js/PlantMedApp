import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

import {text} from '../text';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import { usePlantData, useSymptomData } from '@src/hooks/useData';
import SourcesPlants from '@src/components/SourcesPlants';
import SourcesSymptoms from '@src/components/SourcesSymptoms';

const Sources: React.FC = () => {
  const [tab, setTab] = useState(0);

  const {plants: plantsData, loading: plantsLoading, error: plantsError} = usePlantData();

  const {symptoms: symptomsData, loading: symptomsLoading, error: symptomsError} = useSymptomData();

  const loading = plantsLoading || symptomsLoading;

  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} title='Sources' />;
  };

  const renderTabs = (): JSX.Element => {
    const tabs = [
      {name: 'Plantes', svg: <svg.InfoSquareSvg />},
      {
        name: 'Symptômes',
        svg: <svg.ClipboardListSvg />,
      },
    ];

    return (
      <View
        style={{
          ...theme.flex.rowCenterSpaceEvenly,
          marginBottom: utils.responsiveHeight(20),
          flex: 1,
          width: '100%',
        }}
      >
        {tabs.map((tabItem, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 20,
              borderWidth: 1,
              paddingVertical: 20,
              marginTop: 10,
              borderRadius: 10,
              width: '45%',
              ...theme.flex.colCenter,
              borderColor:
                tab === index
                  ? theme.colors.steelTeal
                  : theme.colors.transparent,
              backgroundColor:
                tab === index ? theme.colors.white : theme.colors.transparent,
              position: 'relative',
            }}
            onPress={() => setTab(index)}
          >
            <text.T14
              style={{
                color: theme.colors.textColor,
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            >
              {tabItem.name}
            </text.T14>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTabContent = (): JSX.Element | null => {
    switch (tab) {
      case 0:
        return (
          <SourcesPlants
            plantsData={plantsData}
            plantsLoading={plantsLoading}
            plantsError={!!plantsError}
          />
        );
      case 1:
        return (
          <SourcesSymptoms
            symptomsData={symptomsData}
            symptomsLoading={symptomsLoading}
            symptomsError={!!symptomsError}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = (): JSX.Element => {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderTabs()}
        {renderTabContent()}
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={{flex: 1}}
      resizeMode='stretch'
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{backgroundColor: theme.colors.transparent}}
      >
        {loading ? (
          <components.Loader />
        ) : (
          <>
            {renderHeader()}
            {renderContent()}
          </>
        )}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default Sources;
