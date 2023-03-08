export enum BlockHeight {
    Small = '200px',
    Medium = '400px',
    Large = '800px',
}

export type Settings = {
    embedStyle: string;
    formId: string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: string;
    buttonText: string;
    header: boolean;
    footer: boolean;
    transparent: boolean;
};
