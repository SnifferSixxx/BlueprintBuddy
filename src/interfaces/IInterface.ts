import { IAttribute } from "./IAttribute";

export interface IInterface {
  name: string;
  attributes: { [key: string]: IAttribute };
}
