import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Card, FAB, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { theme } from '../theme';
import { useAuthStore } from '../store/useAuthStore';
import { useProjectStore } from '../store/useProjectStore';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuthStore();
  const { projects, fetchProjects, isLoading } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleNewProject = () => {
    // In production, would open a modal/dialog for project creation
    navigation.navigate('Projects');
  };

  const handleOpenProject = (projectId: string) => {
    navigation.navigate('Editor', { projectId });
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text variant="headlineMedium" style={styles.welcomeText}>
            Welcome back{user?.name ? `, ${user.name}` : ''}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Let's build something amazing
          </Text>
        </View>
        <IconButton
          icon="cog"
          size={24}
          onPress={handleSettings}
          iconColor={theme.colors.text}
        />
      </View>

      {/* Subscription Banner */}
      {user?.subscription.tier === 'FREE' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Subscription')}
          style={styles.banner}
        >
          <Card style={styles.bannerCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.bannerTitle}>
                Upgrade to Pro
              </Text>
              <Text variant="bodyMedium" style={styles.bannerText}>
                Unlock unlimited AI requests and advanced features
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        <View style={styles.quickActions}>
          <Card style={styles.actionCard} onPress={handleNewProject}>
            <Card.Content style={styles.actionContent}>
              <IconButton icon="plus" size={32} iconColor={theme.colors.primary} />
              <Text variant="labelLarge">New Project</Text>
            </Card.Content>
          </Card>

          <Card style={styles.actionCard} onPress={() => navigation.navigate('Projects')}>
            <Card.Content style={styles.actionContent}>
              <IconButton icon="folder" size={32} iconColor={theme.colors.secondary} />
              <Text variant="labelLarge">My Projects</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Recent Projects */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Recent Projects
        </Text>
        <ScrollView style={styles.projectsList}>
          {projects.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No projects yet</Text>
              <Button mode="contained" onPress={handleNewProject} style={styles.createButton}>
                Create Your First Project
              </Button>
            </View>
          ) : (
            projects.map((project) => (
              <Card
                key={project.id}
                style={styles.projectCard}
                onPress={() => handleOpenProject(project.id)}
              >
                <Card.Content>
                  <View style={styles.projectHeader}>
                    <View style={styles.projectInfo}>
                      <Text variant="titleMedium">{project.name}</Text>
                      <Text variant="bodySmall" style={styles.projectMeta}>
                        {project.language} • {new Date(project.updatedAt).toLocaleDateString()}
                      </Text>
                    </View>
                    <IconButton
                      icon="chevron-right"
                      size={20}
                      iconColor={theme.colors.textSecondary}
                    />
                  </View>
                  {project.description && (
                    <Text variant="bodyMedium" style={styles.projectDescription}>
                      {project.description}
                    </Text>
                  )}
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleNewProject}
        color={theme.colors.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
  },
  welcomeText: {
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  banner: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  bannerCard: {
    backgroundColor: theme.colors.primary,
  },
  bannerTitle: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  bannerText: {
    color: theme.colors.background,
    opacity: 0.9,
    marginTop: theme.spacing.xs,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  actionContent: {
    alignItems: 'center',
  },
  projectsList: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectInfo: {
    flex: 1,
  },
  projectMeta: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  projectDescription: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  createButton: {
    marginTop: theme.spacing.md,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;
