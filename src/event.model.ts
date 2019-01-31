import { IsNotEmpty } from "class-validator";

export class Event {
  id?: number;
  userId?: number;

  @IsNotEmpty()
  type: string;  
  created?: number;

  constructor(partial: Partial<Event>) {
    Object.assign(this, partial);
  }
}
