import { FC } from 'react';
import { PopupButton, SliderButton, Widget } from '@typeform/embed-react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import styles from './style.module.css';
import type { Settings } from './types';

const Placeholder: FC = () => (
    <div>
        <p className={styles.placeholder}>Please enter a Typeform form id in the block settings.</p>
    </div>
);

export const TypeformBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    if (!blockSettings.formId) {
        return <Placeholder />;
    }

    const renderEmbed = () => {
        switch (blockSettings.embedStyle) {
            case 'embed':
                return (
                    <Widget
                        style={{
                            height: blockSettings.isHeightCustom
                                ? blockSettings.heightCustom
                                : blockSettings.heightSimple,
                        }}
                        id={blockSettings.formId}
                        enableSandbox={isEditing}
                        hideHeaders={!blockSettings.header}
                        hideFooter={!blockSettings.footer}
                        opacity={blockSettings.transparent ? 0 : 100}
                    />
                );

            case 'popup':
                return (
                    <PopupButton
                        size={100}
                        opacity={100}
                        className="a-button-primary"
                        id={blockSettings.formId}
                        enableSandbox={isEditing}
                        hideHeaders={!blockSettings.header}
                        hideFooter={!blockSettings.footer}
                    >
                        {blockSettings.buttonText}
                    </PopupButton>
                );

            case 'sidePanel':
                return (
                    <SliderButton
                        className="a-button-primary"
                        id={blockSettings.formId}
                        enableSandbox={isEditing}
                        hideHeaders={!blockSettings.header}
                        hideFooter={!blockSettings.footer}
                    >
                        {blockSettings.buttonText}
                    </SliderButton>
                );

            default:
                return <Placeholder />;
        }
    };

    return <div className={styles.container}>{renderEmbed()}</div>;
};
