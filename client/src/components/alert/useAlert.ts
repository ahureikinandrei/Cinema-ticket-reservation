import { useAction, useAppSelector } from '../../hooks/redux';
import { getUserErrorMessage } from '../../redux/users/selectors';
import { getAppErrorMessage } from '../../redux/app/selectors';

export const useAlert = (): [boolean, string | null, () => void] => {
    const errorUserMessage = useAppSelector(getUserErrorMessage);
    const errorAppMessage = useAppSelector(getAppErrorMessage);
    const { setUserErrorMessage, setAppMessage } = useAction();

    const show = !!errorUserMessage || !!errorAppMessage;

    const onClose = (): void => {
        if (errorUserMessage) {
            setUserErrorMessage('');
        }

        if (errorAppMessage) {
            setAppMessage('');
        }
    };

    return [show, errorUserMessage || errorAppMessage, onClose];
};
