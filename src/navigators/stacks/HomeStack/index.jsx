import styles from '../styles';
import { useContext } from 'react';
import { SvgXml } from 'react-native-svg';
import Home from '../../../screens/Home';
import { TouchableOpacity } from 'react-native';
import { IndependentColors } from '../../../config/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import { STANDARD_VECTOR_ICON_SIZE } from '../../../config/Constants';
import { ThemeContext } from '../../../theming/contexts/ThemeContext';
import ic_arrow_left_white from '../../../assets/icons/svg/ic_arrow_left_white';
import useFetchPlants from '../../../hooks/useFetchPlants';
import useFetchSymptomes from '../../../hooks/useFetchSymptoms';
import useFetchBanners from '../../../hooks/useFetchBanners';

// Creating stack navigator
const Stack = createStackNavigator();

// Home stack
const HomeStack = () => {
  // Using context
  const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  useFetchPlants();
  useFetchSymptomes();
  useFetchBanners();

  // Screen options
  const screenOptions = ({ navigation }) => ({
    headerTitleAlign: 'center',
    headerTitleStyle: [styles.headerTitle],
    headerTintColor: IndependentColors.white,
    headerStyle: [
      {
        backgroundColor: theme.accent,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    ],
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.leftArrowIcon}>
        <SvgXml
          xml={ic_arrow_left_white}
          width={STANDARD_VECTOR_ICON_SIZE}
          height={STANDARD_VECTOR_ICON_SIZE}
        />
      </TouchableOpacity>
    ),
  });

  // Returning
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Exporting
export default HomeStack;
