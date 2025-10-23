export const tokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    border: '#C6C6C8',
    text: '#000000',
    textSecondary: '#8E8E93',
    placeholder: '#C7C7CC',
    error: '#FF3B30',
    success: '#34C759',
    disabled: '#D1D1D6',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const defaultStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    backgroundColor: tokens.colors.background,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: tokens.fontSize.md,
    color: tokens.colors.text,
    paddingVertical: 0,
  },
  flagContainer: {
    marginRight: tokens.spacing.sm,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  chevronIcon: {
    marginLeft: tokens.spacing.xs,
  },
  dialCodeText: {
    fontSize: tokens.fontSize.md,
    color: tokens.colors.text,
    marginLeft: tokens.spacing.xs,
    fontWeight: tokens.fontWeight.medium,
  },
  errorText: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.error,
    marginTop: tokens.spacing.xs,
  },
  // Modal
  modal: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  modalHeader: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  searchInput: {
    fontSize: tokens.fontSize.md,
    color: tokens.colors.text,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    minHeight: 40,
  },
  countryItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    minHeight: 56,
  },
  countryItemText: {
    flex: 1,
    fontSize: tokens.fontSize.md,
    color: tokens.colors.text,
    marginLeft: tokens.spacing.md,
  },
  countryItemDialCode: {
    fontSize: tokens.fontSize.md,
    color: tokens.colors.textSecondary,
    marginLeft: tokens.spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: tokens.colors.border,
    marginLeft: tokens.spacing.lg,
  },
};

