import { createText } from '@shopify/restyle';
import type { Theme } from '../../theme';

const Text = createText<Theme>();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.variant = 'body';
Text.defaultProps.color = 'text';

export default Text;
