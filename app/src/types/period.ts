import { Category, FoodEntry } from "./foods";

export type Meal = "breakfast" | "snack1" | "lunch" | "snack2" | "dinner";

export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export enum DaysEnum {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export type DailySchedule = Record<Meal, FoodEntry>;

export type WeeklySchedule = Record<Days, DailySchedule>;

export type WeeklyScheduleRows = Record<Meal, Array<FoodEntry>>;
