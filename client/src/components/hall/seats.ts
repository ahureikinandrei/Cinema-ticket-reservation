const simpleSeat = {
    type: 0,
    size: 1,
    bought: false,
};
const primeSeat = {
    type: 1,
    size: 2,
    bought: false,
};
const loveSeat = {
    type: 2,
    size: 2,
    bought: false,
};

export interface ISeat {
    type: number;
    size: number;
    bought: boolean;
}

export const hallData: Array<ISeat[]> = [
    [
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
        simpleSeat,
    ],
    [loveSeat, loveSeat, loveSeat, loveSeat, loveSeat],
    [primeSeat, primeSeat, primeSeat, primeSeat, primeSeat, primeSeat],
    [primeSeat, primeSeat, primeSeat, primeSeat, primeSeat, primeSeat],
    [primeSeat, primeSeat, primeSeat, primeSeat, primeSeat, primeSeat],
    [primeSeat, primeSeat, primeSeat, primeSeat, primeSeat, primeSeat],
    [loveSeat, loveSeat, loveSeat, loveSeat, loveSeat],
];
