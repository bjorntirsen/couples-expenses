export interface Month {
  _id?: object;
  id?: string;
  month: string;
  person1: string;
  person2: string;
  p1income: number;
  p2income: number;
  p1spent: number;
  p2spent: number;
  p1hasPaid: number;
  p2hasPaid: number;
  dateLastModified?: Date;
  locked: boolean;
}
