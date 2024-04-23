import { ReadLine } from "readline";
import { IEntity } from "./IEntity";

export type IMenuOption = (
  rl: ReadLine,
  entities: IEntity[],
  callback: Function
) => void;
