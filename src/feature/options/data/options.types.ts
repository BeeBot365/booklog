// Interface för options

export interface Option {
  id: string;
  goalPerDay: number;
  reminderTime: Date;
  wantToBeReminded: boolean;
}
