import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, IconButton, Button, Chip } from 'react-native-paper';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { theme } from '../theme';
import { useProjectStore } from '../store/useProjectStore';
import { useAIStore } from '../store/useAIStore';

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>;
type EditorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Editor'>;

const EditorScreen: React.FC = () => {
  const route = useRoute<EditorScreenRouteProp>();
  const navigation = useNavigation<EditorScreenNavigationProp>();
  const { projectId, fileId } = route.params;

  const { currentProject } = useProjectStore();
  const { isGenerating, generateCode } = useAIStore();

  const [code, setCode] = useState('// Start coding...\n\nfunction hello() {\n  console.log("Hello, World!");\n}');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');

  useEffect(() => {
    // Load project and file content
    // In production, fetch from API
  }, [projectId, fileId]);

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    try {
      const generatedCode = await generateCode(aiPrompt, { currentCode: code });
      setCode(generatedCode);
      setAIPrompt('');
      setShowAIPanel(false);
    } catch (error) {
      console.error('Failed to generate code:', error);
    }
  };

  const handleSave = () => {
    // Save file content
    console.log('Saving file...');
  };

  const handleRun = () => {
    // Execute code
    console.log('Running code...');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            iconColor={theme.colors.text}
          />
          <View>
            <Text variant="titleMedium" style={styles.headerTitle}>
              {currentProject?.name || 'Untitled'}
            </Text>
            <Text variant="bodySmall" style={styles.headerSubtitle}>
              main.js
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <IconButton
            icon="content-save"
            size={20}
            onPress={handleSave}
            iconColor={theme.colors.text}
          />
          <IconButton
            icon="play"
            size={20}
            onPress={handleRun}
            iconColor={theme.colors.success}
          />
        </View>
      </View>

      {/* Code Editor */}
      <View style={styles.editorContainer}>
        <ScrollView style={styles.editor}>
          <TextInput
            value={code}
            onChangeText={setCode}
            multiline
            style={styles.codeInput}
            placeholder="Start typing..."
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
        </ScrollView>

        {/* Line numbers */}
        <View style={styles.lineNumbers}>
          {code.split('\n').map((_, index) => (
            <Text key={index} style={styles.lineNumber}>
              {index + 1}
            </Text>
          ))}
        </View>
      </View>

      {/* AI Panel */}
      {showAIPanel && (
        <View style={styles.aiPanel}>
          <View style={styles.aiPanelHeader}>
            <Text variant="titleSmall" style={styles.aiPanelTitle}>
              AI Code Generator
            </Text>
            <IconButton
              icon="close"
              size={20}
              onPress={() => setShowAIPanel(false)}
              iconColor={theme.colors.text}
            />
          </View>
          <TextInput
            value={aiPrompt}
            onChangeText={setAIPrompt}
            placeholder="Describe what you want to build..."
            style={styles.aiInput}
            multiline
            autoFocus
          />
          <Button
            mode="contained"
            onPress={handleAIGenerate}
            loading={isGenerating}
            disabled={isGenerating || !aiPrompt.trim()}
            style={styles.aiButton}
          >
            Generate Code
          </Button>
        </View>
      )}

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            icon="robot"
            onPress={() => setShowAIPanel(!showAIPanel)}
            style={styles.toolbarChip}
            selected={showAIPanel}
          >
            AI Assistant
          </Chip>
          <Chip icon="format-text" style={styles.toolbarChip}>
            Format
          </Chip>
          <Chip icon="comment" style={styles.toolbarChip}>
            Comment
          </Chip>
          <Chip icon="find-replace" style={styles.toolbarChip}>
            Find
          </Chip>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.text,
  },
  headerSubtitle: {
    color: theme.colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
  },
  editorContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  lineNumbers: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  lineNumber: {
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.editor.lineNumber,
    textAlign: 'right',
    lineHeight: 20,
  },
  editor: {
    flex: 1,
  },
  codeInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    padding: theme.spacing.md,
    lineHeight: 20,
    minHeight: '100%',
  },
  aiPanel: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: theme.spacing.md,
    maxHeight: 300,
  },
  aiPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  aiPanelTitle: {
    color: theme.colors.text,
  },
  aiInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    minHeight: 80,
  },
  aiButton: {
    marginTop: theme.spacing.sm,
  },
  toolbar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  toolbarChip: {
    marginRight: theme.spacing.sm,
  },
});

export default EditorScreen;
