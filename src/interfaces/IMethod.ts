import { IInterface } from "./IInterface";

export interface IMethod {
  name: string;
  inputInterface: IInterface | null;
  outputInterface: IInterface | null;
}
