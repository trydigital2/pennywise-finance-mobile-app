const React = require('react');

const mockComponent = (name) => {
  const Component = (props) => React.createElement(name, props, props.children);
  Component.displayName = name;
  return Component;
};

module.exports = {
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  TextInput: mockComponent('TextInput'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  Pressable: mockComponent('Pressable'),
  ScrollView: mockComponent('ScrollView'),
  FlatList: (props) => {
    const items = props.data ? props.data.map((item, index) => {
      return props.renderItem ? props.renderItem({ item, index }) : null;
    }) : null;
    return React.createElement('FlatList', props, items);
  },
  SafeAreaView: mockComponent('SafeAreaView'),
  Modal: mockComponent('Modal'),
  Switch: mockComponent('Switch'),
  ActivityIndicator: mockComponent('ActivityIndicator'),
  KeyboardAvoidingView: mockComponent('KeyboardAvoidingView'),
  StatusBar: mockComponent('StatusBar'),
  Dimensions: {
    get: jest.fn(() => ({ width: 390, height: 844, scale: 3, fontScale: 1 })),
    addEventListener: jest.fn(() => ({ remove: jest.fn() }))
  },
  Platform: {
    OS: 'ios',
    select: (obj) => obj.ios !== undefined ? obj.ios : obj.default
  },
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => Array.isArray(style) ? Object.assign({}, ...style) : (style || {})
  },
  Alert: {
    alert: jest.fn()
  }
};
