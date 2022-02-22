export const getDateToISO = (): string => {
    const [dateString] = new Date().toISOString().split('T');
    return dateString;
};

export const getTimeToISO = (): string => {
    const [timeString] = new Date().toTimeString().split(' ');
    const [hour, minutes] = timeString.split(':');
    return `${hour}:${minutes}`;
};
