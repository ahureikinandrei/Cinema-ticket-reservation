export interface IInitialState {
    name: string;
    description: string;
    selectedGenre: string;
    age: string;
    startDate: string;
    endDate: string;
    rating: string;
}

export const initState = (): IInitialState => {
    return {
        name: '',
        description: '',
        selectedGenre: 'Add genre',
        age: '',
        startDate: '',
        endDate: '',
        rating: '',
    };
};

interface IAction {
    type: string;
    payload: string;
}

export enum Action {
    NAME = 'name',
    DESCRIPTION = 'description',
    SELECTED_GENRE = 'selectedGenre',
    AGE = 'age',
    START_DATE = 'startDate',
    END_DATE = 'endDate',
    RATING = 'rating',
    DEFAULT = 'default',
}

export const formReducer = (
    state: IInitialState,
    action: IAction
): IInitialState => {
    const { type, payload } = action;
    switch (type) {
        case Action.NAME:
            return {
                ...state,
                name: payload,
            };
        case Action.DESCRIPTION:
            return {
                ...state,
                description: payload,
            };
        case Action.SELECTED_GENRE:
            return {
                ...state,
                selectedGenre: payload,
            };
        case Action.AGE:
            return {
                ...state,
                age: payload,
            };
        case Action.START_DATE:
            return {
                ...state,
                startDate: payload,
            };
        case Action.END_DATE:
            return {
                ...state,
                endDate: payload,
            };
        case Action.RATING:
            return {
                ...state,
                rating: payload,
            };
        case Action.DEFAULT:
            return initState();
        default:
            return state;
    }
};
