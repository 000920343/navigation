import React from 'react';
import { View, StyleSheet, Text, Appearance } from 'react-native';

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>To-Do List App © 2024</Text>
  </View>
);

const MainLayout = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#121212' : '#f5f5f5';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {children}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
});

export default MainLayout;
