import { RootState } from '../store';

export const getSelectedSeats = (state: RootState): Array<boolean[]> =>
    state.order.selectedSeats;
