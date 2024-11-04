import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface AvatarProps {
  size: number;
  uri?: string | ImageSourcePropType;  // Changed from source to uri and added ImageSourcePropType
  name?: string;  // Made optional with ?
}

const Avatar: React.FC<AvatarProps> = ({ size, uri, name }) => {
  const getInitial = (name?: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image
          source={typeof uri === 'string' ? { uri } : uri}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={[styles.text, { fontSize: size * 0.4 }]}>
          {getInitial(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E1E1', // Un gris plus clair pour le fond
    overflow: 'hidden', // Assure que l'image respecte le borderRadius
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
    color: '#666', // Gris plus foncé pour le texte
    fontWeight: '600',
  },
});

export default Avatar;