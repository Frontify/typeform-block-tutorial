import { BlockHeight } from './types';
import {
    DropdownSize,
    IconEnum,
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

export const HEIGHT_DEFAULT_VALUE = BlockHeight.Small;

export const settings = defineSettings({
    main: [
        {
            id: 'embedStyle',
            type: 'dropdown',
            label: 'Embed Type',
            defaultValue: 'embed',
            size: DropdownSize.Large,
            choices: [
                {
                    value: 'embed',
                    icon: IconEnum.MarkArea,
                    label: 'Embed',
                },
                {
                    value: 'popup',
                    icon: IconEnum.TextBoxStack,
                    label: 'Popup',
                },
                {
                    value: 'sidePanel',
                    icon: IconEnum.SidebarRight,
                    label: 'Side Panel',
                },
            ],
        },
    ],
    content: [
        {
            id: 'formId',
            type: 'input',
            label: 'Typeform Form ID',
            info: 'You can find <form-id> from the public URL of your form: https://form.typeform.com/to/<form-id>',
        },
        {
            id: 'buttonText',
            label: 'Button Label',
            type: 'input',
            placeholder: 'Open Form',
            defaultValue: 'Open Form',
            show: (bundle) =>
                bundle.getBlock('embedStyle')?.value === 'popup' ||
                bundle.getBlock('embedStyle')?.value === 'sidePanel',
        },
    ],
    layout: [
        {
            id: 'header',
            type: 'switch',
            label: 'Header',
            info: 'Controls the header that appears when you have a question group, or a long question',
            defaultValue: false,
        },
        {
            id: 'footer',
            type: 'switch',
            label: 'Footer',
            info: 'Controls the visiblity of the form progress bar and navigation buttons',
            defaultValue: true,
        },
        {
            id: 'position',
            type: 'slider',
            label: 'Slider position',
            defaultValue: 'right',
            choices: [
                {
                    value: 'left',
                    label: 'Left',
                },
                {
                    value: 'right',
                    label: 'Right',
                },
            ],
            show: (bundle) => bundle.getBlock('embedStyle')?.value === 'sidePanel',
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle) => bundle.getBlock('embedStyle')?.value === 'embed',
            info: 'Determines the block height.',
            on: [
                {
                    id: 'heightCustom',
                    type: 'input',
                    placeholder: '100px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, 'heightCustom'),
                },
            ],
            off: [
                {
                    id: 'heightSimple',
                    type: 'slider',
                    defaultValue: HEIGHT_DEFAULT_VALUE,
                    choices: [
                        {
                            value: BlockHeight.Small,
                            label: 'S',
                        },
                        {
                            value: BlockHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: BlockHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'transparent',
            label: 'Transparent Background',
            info: 'Enable or disable the background of the form',
            type: 'switch',
            show: (bundle) => bundle.getBlock('embedStyle')?.value === 'embed',
            defaultValue: false,
        },
    ],
});
