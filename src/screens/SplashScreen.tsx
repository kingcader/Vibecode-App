import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { theme } from '../theme';
import { useAuthStore } from '../store/useAuthStore';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { isAuthenticated, isLoading, refreshUser } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      await refreshUser();

      // Simulate splash delay
      setTimeout(() => {
        if (isAuthenticated) {
          navigation.replace('Home');
        } else {
          navigation.replace('Auth');
        }
      }, 1500);
    };

    initialize();
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Vibecode
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        AI Coding Agent
      </Text>
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xxl,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
});

export default SplashScreen;
