import { IAttribute } from "./IAttribute";
import { IMethod } from "./IMethod";

export interface IEntity {
  name: string;
  attributes: { [key: string]: IAttribute };
  methods: { [key: string]: IMethod };
}
