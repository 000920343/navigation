import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const AboutScreen = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      spinAnim.setValue(0); 
    });
  };

  const spinInterpolation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>About This App</Text>
        <View style={styles.card}>
          <Text style={styles.description}>
            The <Text style={styles.appName}>To-Do List App</Text> helps users manage tasks efficiently. 
            It provides a simple and intuitive interface to organize tasks based on their status: 
            <Text style={styles.highlight}> All, Completed,</Text> and <Text style={styles.highlight}>Pending</Text>.
          </Text>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View
              style={[
                styles.profileContainer,
                { transform: [{ rotateY: spinInterpolation }] },
              ]}
            >
              <Image
                source={require('../../assets/profile-pic.jpg')} // Replace with your profile picture
                style={styles.profileImage}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Text style={styles.name}>Created by: Shubhampreet Singh</Text>
          <Text style={styles.credits}>
            A modern task management app designed to bring delightful user experiences to your daily planning.
          </Text>
        </View>
        <Text style={styles.footer}>To-Do List App © 2024</Text>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    lineHeight: 24,
  },
  appName: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FF9800',
  },
  profileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  credits: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default AboutScreen;
