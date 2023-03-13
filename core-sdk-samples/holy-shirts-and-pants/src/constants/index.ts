/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// Handles a TS-ESLINT bug: https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
export enum ORDER_PHASES {
    IN_PROGRESS = 'inProgress',
    REVIEW = 'review',
    COMPLETE = 'complete',
}

export enum MODAL_MODES {
    CLOSED = 'closed',
    ENTRY = 'entry',
    UPDATE = 'update',
    CONFIRM = 'confirm',
    LOCAL_DEV = 'local_dev',
}

export type ModalModeTypes =
    | MODAL_MODES.CLOSED
    | MODAL_MODES.ENTRY
    | MODAL_MODES.UPDATE
    | MODAL_MODES.CONFIRM
    | MODAL_MODES.LOCAL_DEV;

export type OrderPhaseTypes =
    | ORDER_PHASES.IN_PROGRESS
    | ORDER_PHASES.REVIEW
    | ORDER_PHASES.COMPLETE;

export const APIkeyModalMessage =
    'You have started the app without an API key in the config. For information on how to add your API key, see the README.md. Once you add your API key, restart your server for changes to take effect.';

export const LOCAL_STORAGE_KEY = 'mp-holyshirtsandpants-shop';

export const API_KEY_QUERY_PARAM = 'key';

export const SAMPLE_APP_GITHUB_REPOSITORY_URL =
    'https://github.com/mParticle/mparticle-web-sample-apps';

export const SAMPLE_APP_README_GITHUB_REPOSITORY_URL =
    'https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/README.md';

export const DOCSITE_API_KEY_QUICKSTART =
    'https://docs.mparticle.com/developers/quickstart/senddata/#1-generate-your-api-key-2';

export const DOCSITE_API_KEY_ACCESS =
    'https://docs.mparticle.com/guides/getting-started/create-an-input/#create-access-credentials';
