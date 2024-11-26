import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { utils } from '@src/utils';
import { text } from '@src/text';
import { theme } from '@src/constants';
import { SymptomType } from '@src/types';

interface Source {
  url: string;
  title: string;
}

interface SourcesSymptomsProps {
  symptomsData: SymptomType[];
  symptomsLoading: boolean;
  symptomsError: boolean;
}

const SourcesSymptoms: React.FC<SourcesSymptomsProps> = ({
  symptomsData,
  symptomsLoading,
  symptomsError,
}) => {
  const handleSourcePress = (url: string) => {
    Linking.openURL(url).catch(err => 
      console.error("Couldn't load page", err)
    );
  };

  if (symptomsLoading) {
    return <Text>Loading...</Text>;
  }

  if (symptomsError) {
    return <Text>Error loading sources data.</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        flexGrow: 1,
        paddingTop: utils.responsiveHeight(40),
        paddingBottom: utils.responsiveHeight(20),
      }}
      showsVerticalScrollIndicator={false}
    >
      {symptomsData?.map((symptom) => (
        symptom.sources && symptom.sources.length > 0 ? (
          <View
            key={symptom.id}
            style={{
              marginBottom: utils.responsiveHeight(20),
            }}
          >
            <text.H5 
              style={{
                marginBottom: utils.responsiveHeight(10),
                color: theme.colors.textColor,
              }}
            >
              {symptom.name}
            </text.H5>
            {symptom.sources.map((source: Source, index: number) => (
              <TouchableOpacity
                key={`${symptom.id}-${index}`}
                onPress={() => handleSourcePress(source.url)}
                style={{
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: theme.colors.mainColor,
                    marginRight: 8,
                    marginTop: Platform.OS === 'ios' ? 1 : 0,
                  }}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    ...theme.fonts.DM_Sans_400Regular,
                    fontSize: Platform.OS === 'ios' ? 14 : 12,
                    color: theme.colors.mainColor,
                    textDecorationLine: 'underline',
                    flex: 1,
                  }}
                >
                  {source.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null
      ))}
    </ScrollView>
  );
};

export default SourcesSymptoms;