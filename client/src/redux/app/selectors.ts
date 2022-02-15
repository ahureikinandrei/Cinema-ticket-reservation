import { RootState } from '../store';

export const getAppErrorMessage = (state: RootState): string | null =>
    state.app.error;
