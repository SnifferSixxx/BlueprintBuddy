import TerminalDrawer from "./TerminalDrawer";
import { IEntity, IAttribute } from "./interfaces";
import { validTypes, isValidAttributeName } from "./utils";

class AttributeCreator {
  private drawer: TerminalDrawer;
  private entity: IEntity;

  constructor(entity: IEntity, drawer: TerminalDrawer) {
    this.drawer = drawer;
    this.entity = entity;
  }

  createAttribute(callback: Function) {
    this.promptForAttribute(callback);
  }

  promptForAttribute(callback: Function, error: string = "") {
    this.drawer.clearScreen();

    this.drawer.printTitle(`Atributos de: ${this.entity.name}`);

    if (error !== "") {
      this.drawer.printError(error);
    }

    // Mostrar atributos actuales
    if (Object.keys(this.entity.attributes).length > 0) {
      this.drawer.printSubTitle("Atributos actuales:");
      Object.entries(this.entity.attributes).forEach(
        ([key, { type, optional }]) => {
          this.drawer.printMessage(
            `${key}: ${type} ${optional ? "(opcional)" : ""}`
          );
        }
      );
    }

    this.drawer.printMessage(
      "Ingrese 'done' para finalizar o continúe añadiendo atributos."
    );
    this.drawer.askQuestion(
      "Ingrese el atributo y su tipo (ej. edad:number, nombre?:string)",
      (input) => {
        if (input.toLowerCase() === "done") {
          this.drawer.printMessage("Finalización de la creación de atributos.");
          callback(); // Salir y regresar al menú anterior o continuar con otro flujo
          return;
        }

        const parts = input.split(":");
        if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
          this.promptForAttribute(
            callback,
            "Formato inválido. Por favor, use el formato 'nombre:tipo'."
          );
          return;
        }

        let [name, type] = parts.map((part) => part.trim());
        const optional = name.endsWith("?");

        if (optional) {
          name = name.slice(0, -1); // Remove the "?" from the end
        }

        if (!isValidAttributeName(name)) {
          this.promptForAttribute(callback, "Nombre de atributo inválido.");
          return;
        }

        if (!validTypes.has(type)) {
          this.promptForAttribute(
            callback,
            `Tipo '${type}' no es válido. Tipos válidos: ${Array.from(
              validTypes
            ).join(", ")}.`
          );
          return;
        }

        if (this.entity.attributes.hasOwnProperty(name)) {
          this.promptForAttribute(
            callback,
            "Un atributo con ese nombre ya existe."
          );
          return;
        }

        const newAttribute: IAttribute = { type, optional };
        this.entity.attributes[name] = newAttribute;
        this.drawer.printMessage(
          `Atributo '${name}' de tipo '${type}' ${
            optional ? "(opcional)" : ""
          } añadido con éxito.`
        );
        this.promptForAttribute(callback); // Continuar solicitando atributos
      }
    );
  }

  close() {
    this.drawer.close();
  }
}

export default AttributeCreator;
