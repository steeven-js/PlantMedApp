import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface AvatarProps {
  size: number;
  uri: string | null | undefined;
  name: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ size, uri, name }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={styles.text}>
          {name ? name.charAt(0) : ''}
        </Text>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // Couleur de fond par défaut si pas d'image
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
