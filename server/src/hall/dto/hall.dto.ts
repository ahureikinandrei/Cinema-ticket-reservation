export interface ISeat {
  type: number;
  size: number;
}

export class HallDto {
  readonly name: string;
  readonly schema: Array<ISeat[]>;
}
