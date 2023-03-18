import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';

const useAppTheme = () => useTheme<Theme>();

export default useAppTheme;
