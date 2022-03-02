export class PriceDto {
  readonly seatPrice: {
    simple: number;
    love: number;
    prime: number;
  };
  readonly seatsStatus: [
    [
      {
        type: string;
        size: number;
        isBought: boolean;
      },
    ],
  ];
}
