import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Markdown from 'react-native-markdown-display';

import { ThemeContext } from '../../theming/contexts/ThemeContext';
import Rules from './Rules';
import styles from './styles';
import CguData from '../../data/CguData';

// Functional component
const Cgu = () => {
    // Using context
    const { isLightTheme, lightTheme, darkTheme } = useContext(ThemeContext);

    // Getting theme config according to the theme mode
    const theme = isLightTheme ? lightTheme : darkTheme;

    const rules = Rules(theme); // Appel de la fonction Rules avec le thème actuel

    return (
        <View style={[styles.mainWrapper, { backgroundColor: theme.primary }]}>
            <Animatable.View animation="fadeInUp" delay={100}>
                {/* Scroll view */}
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        styles.scrollViewContentContainerStyle
                    }
                >
                    <Markdown
                        rules={rules} // Utiliser les règles de rendu basées sur le thème
                    >
                        {CguData}
                    </Markdown>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default Cgu;
