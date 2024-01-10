const React = require('react');

const MockIcon = (props) => {
  return React.createElement('Icon', props, null);
};

module.exports = {
  Ionicons: MockIcon,
  MaterialCommunityIcons: MockIcon,
  FontAwesome5: MockIcon,
  Feather: MockIcon,
  default: MockIcon
};
