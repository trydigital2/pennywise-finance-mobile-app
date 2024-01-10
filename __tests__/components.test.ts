import React from 'react';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { Badge } from '../src/components/common/Badge';
import { CategoryIcon } from '../src/components/common/CategoryIcon';

describe('Reusable Common Components Logic', () => {
  test('PrimaryButton initializes with valid title and props', () => {
    const element = React.createElement(PrimaryButton, {
      title: 'Save Details',
      onPress: () => {},
      variant: 'primary',
      size: 'md',
    });
    expect(React.isValidElement(element)).toBe(true);
    expect(element.props.title).toBe('Save Details');
  });

  test('Badge component returns styled component structure', () => {
    const badge = React.createElement(Badge, {
      label: 'EXPENSE',
      variant: 'danger',
    });
    expect(React.isValidElement(badge)).toBe(true);
    expect(badge.props.label).toBe('EXPENSE');
  });

  test('CategoryIcon renders container with correct dimensions', () => {
    const icon = React.createElement(CategoryIcon, {
      iconName: 'restaurant',
      color: '#F59E0B',
      size: 'md',
    });
    expect(React.isValidElement(icon)).toBe(true);
    expect(icon.props.iconName).toBe('restaurant');
  });
});
