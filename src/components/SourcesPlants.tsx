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



interface SourcesPlantsProps {
  plantsData: any;
  plantsLoading: boolean;
  plantsError: boolean;
}

const SourcesPlants: React.FC<SourcesPlantsProps> = ({plantsData, plantsLoading, plantsError}) => {
  if (plantsLoading) {
    return <Text>Loading...</Text>;
  }

  if (plantsError) {
    return <Text>Error loading plants data.</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        flexGrow: 1,
        paddingTop: utils.responsiveHeight(40),
        paddingBottom: utils.responsiveHeight(20),
      }}
    >
      {plantsData &&
        plantsData.map((plant: any) => (
          <View
            key={plant.id}
            style={{
              marginBottom: utils.responsiveHeight(20),
            }}
          >
            <text.H5 style={{marginBottom: utils.responsiveHeight(10)}}>
              {plant.name}
            </text.H5>
            {plant.sources &&
              plant.sources.map((source: any, index: number) => (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => Linking.openURL(source.url)}
                >
                  <Text
                    style={{
                      ...theme.fonts.DM_Sans_400Regular,
                      fontSize: Platform.OS === 'ios' ? 14 : 12,
                      lineHeight: Platform.OS === 'ios' ? 14 * 1.7 : 12 * 1.7,
                      color: theme.colors.textColor,
                    }}
                  >
                    {source.url}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
    </ScrollView>
  );
};

export default SourcesPlants;
