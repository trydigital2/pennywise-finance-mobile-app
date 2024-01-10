export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radii';
export * from './shadows';

import { Colors } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';
import { Radii } from './radii';
import { Shadows } from './shadows';

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radii: Radii,
  shadows: Shadows,
};

export default Theme;
