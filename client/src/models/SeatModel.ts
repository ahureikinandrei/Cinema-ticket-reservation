export class SeatModel {
    public type: number;

    public size: number;

    constructor(seatType: number) {
        this.type = seatType;
        this.size = seatType === 0 || seatType === 3 ? 1 : 2;
    }
}
