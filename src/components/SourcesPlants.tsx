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

interface Source {
  url: string;
  title: string;
}

interface Plant {
  id: string;
  name: string;
  sources?: Source[];
}

interface SourcesPlantsProps {
  plantsData: Plant[];
  plantsLoading: boolean;
  plantsError: boolean;
}

const SourcesPlants: React.FC<SourcesPlantsProps> = ({
  plantsData,
  plantsLoading,
  plantsError,
}) => {
  if (plantsLoading) {
    return <Text>Loading...</Text>;
  }

  if (plantsError) {
    return <Text>Error loading plants data.</Text>;
  }

  const handleSourcePress = (url: string) => {
    Linking.openURL(url).catch(err => 
      console.error("Couldn't load page", err)
    );
  };

  // Filtrer les plantes qui ont des sources
  const plantsWithSources = plantsData?.filter(
    plant => plant.sources && plant.sources.length > 0
  );

  if (!plantsWithSources || plantsWithSources.length === 0) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 20 
      }}>
        <text.H5>Aucune source disponible.</text.H5>
      </View>
    );
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
      {plantsWithSources.map((plant) => (
        <View
          key={plant.id}
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
            {plant.name}
          </text.H5>
          {plant.sources?.map((source, index) => (
            <TouchableOpacity
              key={`${plant.id}-${index}`}
              onPress={() => handleSourcePress(source.url)}
              style={{
                marginBottom: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  ...theme.fonts.DM_Sans_400Regular,
                  fontSize: Platform.OS === 'ios' ? 14 : 12,
                  color: theme.colors.mainColor,
                  textDecorationLine: 'underline',
                  maxWidth: '90%',
                }}
              >
                {source.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default SourcesPlants;