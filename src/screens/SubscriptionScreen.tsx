import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { SubscriptionTier } from '../types';

interface PlanCardProps {
  tier: SubscriptionTier;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ tier, name, price, features, popular, onSelect }) => (
  <Card style={[styles.planCard, popular && styles.popularCard]}>
    {popular && (
      <View style={styles.popularBadge}>
        <Text style={styles.popularText}>MOST POPULAR</Text>
      </View>
    )}
    <Card.Content>
      <Text variant="headlineSmall" style={styles.planName}>
        {name}
      </Text>
      <Text variant="displaySmall" style={styles.planPrice}>
        {price}
      </Text>
      <Text variant="bodyMedium" style={styles.planPeriod}>
        per month
      </Text>

      <View style={styles.features}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <IconButton
              icon="check"
              size={16}
              iconColor={theme.colors.success}
              style={styles.checkIcon}
            />
            <Text variant="bodyMedium" style={styles.featureText}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <Button
        mode={popular ? 'contained' : 'outlined'}
        onPress={onSelect}
        style={styles.selectButton}
      >
        {tier === SubscriptionTier.FREE ? 'Current Plan' : 'Subscribe'}
      </Button>
    </Card.Content>
  </Card>
);

const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleSelectPlan = (tier: SubscriptionTier) => {
    console.log('Selected plan:', tier);
    // In production, handle subscription via RevenueCat/Stripe
  };

  const plans = [
    {
      tier: SubscriptionTier.FREE,
      name: 'Free',
      price: '$0',
      features: [
        '50 AI requests per month',
        'Basic code editor',
        'Up to 3 projects',
        'Community support',
      ],
    },
    {
      tier: SubscriptionTier.PRO,
      name: 'Pro',
      price: '$20',
      features: [
        'Unlimited AI requests',
        'Advanced code editor',
        'Unlimited projects',
        'Code execution sandbox',
        'Priority AI processing',
        'Email support',
        'Export to GitHub',
      ],
      popular: true,
    },
    {
      tier: SubscriptionTier.TEAM,
      name: 'Team',
      price: '$49',
      features: [
        'Everything in Pro',
        'Shared team workspaces',
        'Collaborative coding',
        'Team analytics',
        'Custom AI agent training',
        'SSO integration',
        'Priority support',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          iconColor={theme.colors.text}
        />
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Choose Your Plan
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.tier}
            {...plan}
            onSelect={() => handleSelectPlan(plan.tier)}
          />
        ))}

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.footerText}>
            All plans include access to multiple AI models and regular updates
          </Text>
          <Text variant="bodySmall" style={styles.footerText}>
            Cancel anytime. No questions asked.
          </Text>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  headerTitle: {
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  planCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  popularCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    zIndex: 1,
  },
  popularText: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.xs,
    fontWeight: 'bold',
  },
  planName: {
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  planPrice: {
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
  },
  planPeriod: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  features: {
    marginBottom: theme.spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  checkIcon: {
    margin: 0,
  },
  featureText: {
    color: theme.colors.text,
    flex: 1,
  },
  selectButton: {
    marginTop: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
});

export default SubscriptionScreen;
