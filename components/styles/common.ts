import { StyleSheet } from 'react-native';

export const themeColors = {
  primary: '#88cb7f',
  secondary: '#007AFF',
  danger: '#FF3B30',
  text: '#333',
  background: '#f5f5f5',
};

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
};

export const fontSize = {
  heading: 24,
  body: 16,
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: themeColors.background,
  },
  heading: {
    fontSize: fontSize.heading,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontWeight: 'bold',
    color: themeColors.text,
  },
  input: {
    height: 44,
    borderColor: themeColors.text,
    borderWidth: 1,
    marginBottom: spacing.sm,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: fontSize.body,
  },
  linkText: {
    textAlign: 'center',
    color: themeColors.secondary,
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: spacing.sm,
  },
});
