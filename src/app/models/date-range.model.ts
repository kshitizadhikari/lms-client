export type DateRangeModel = {
  startDate: Date;
  endDate: Date,
  numberOfDays: number,
  days: CustomDate[]
}

export type CustomDate = {
  day: string;
  date: Date;
}
