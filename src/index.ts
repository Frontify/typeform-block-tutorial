import { defineBlock } from '@frontify/guideline-blocks-settings';

import { TypeformBlock } from './Block';
import { settings } from './settings';

export default defineBlock({
    block: TypeformBlock,
    settings,
});
