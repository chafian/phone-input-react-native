import '@testing-library/react-native/extend-expect';

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    Svg: ({ children, ...props }) => React.createElement('Svg', props, children),
    Path: (props) => React.createElement('Path', props),
    Rect: (props) => React.createElement('Rect', props),
    Circle: (props) => React.createElement('Circle', props),
  };
});

