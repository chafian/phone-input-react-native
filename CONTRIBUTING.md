# Contributing to Advanced Phone Input

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chafian/phone-input-react-native.git
   cd phone-input-react-native
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Build the library**
   ```bash
   yarn build
   ```

4. **Run tests**
   ```bash
   yarn test
   ```

5. **Run the example app**
   ```bash
   cd examples/expo
   yarn start
   ```

## Project Structure

```
phone-input-react-native/
├── packages/
│   └── phone-input/          # Main library package
│       ├── src/
│       │   ├── components/   # React components
│       │   ├── core/         # Core utilities
│       │   ├── i18n/         # Translations
│       │   ├── styles/       # Styling tokens
│       │   ├── flags/        # Flag components
│       │   └── __tests__/    # Tests
│       └── package.json
├── examples/
│   └── expo/                 # Expo example app
└── package.json
```

## Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Run linting and tests**
   ```bash
   yarn lint
   yarn typecheck
   yarn test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Adding New Features

### Adding a New Language

1. Add translations to `src/i18n/strings.ts`:
   ```typescript
   export const translations: Record<string, I18nStrings> = {
     // ... existing languages
     newLang: {
       searchPlaceholder: 'Translation...',
       // ... other strings
     },
   };
   ```

2. Add country names to `src/core/country.ts`:
   ```typescript
   const countryNames: Record<string, Record<string, string>> = {
     // ... existing languages
     newLang: {
       US: 'Translation',
       // ... other countries
     },
   };
   ```

3. If RTL, add to RTL languages list in `src/i18n/strings.ts`:
   ```typescript
   export function isRTL(locale: string = 'en'): boolean {
     const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'newLang'];
     // ...
   }
   ```

### Adding New Flag Components

1. Create the flag component in `src/flags/index.ts`:
   ```typescript
   const XX: React.FC<{ width: number; height: number }> = ({ width, height }) => (
     <Svg width={width} height={height} viewBox="0 0 60 30">
       {/* SVG paths */}
     </Svg>
   );
   ```

2. Add to the export map:
   ```typescript
   export const flagComponents: Record<string, React.FC<...>> = {
     // ... existing flags
     XX,
   };
   ```

## Testing

- **Unit tests**: Test individual functions and utilities
- **Component tests**: Test React components with @testing-library/react-native
- **Integration tests**: Test complete user flows

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test --coverage
```

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public APIs
- Update TypeScript types
- Add examples to the Expo app

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic

## Pull Request Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Tests**: Include tests for new features
4. **Documentation**: Update docs if needed
5. **Breaking Changes**: Clearly mark breaking changes

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management:

1. Create a changeset:
   ```bash
   yarn changeset
   ```

2. Select the type of change (major, minor, patch)
3. Write a description of the change
4. Commit the changeset file

The maintainers will handle the actual release process.

## Questions?

If you have questions, feel free to:
- Open an issue
- Start a discussion
- Reach out to the maintainers

Thank you for contributing! 🎉

