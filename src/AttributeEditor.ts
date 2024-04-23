import TerminalDrawer from "./TerminalDrawer";
import { IEntity } from "./interfaces/IEntity";
import { validTypes } from "./utils/validTypes";

class AttributeEditor {
  private drawer: TerminalDrawer;
  private entity: IEntity;

  constructor(entity: IEntity, drawer: TerminalDrawer) {
    this.drawer = drawer;
    this.entity = entity;
  }

  modifyAttribute(callback: Function): void {
    this.drawer.clearScreen();
    this.drawer.printTitle("Seleccione el atributo que desea modificar:");
    Object.keys(this.entity.attributes).forEach((key, index) => {
      const attr = this.entity.attributes[key];
      this.drawer.printMessage(
        `${index + 1}. ${key}: ${attr.type}, Opcional: ${
          attr.optional ? "Sí" : "No"
        }`
      );
    });

    this.drawer.askQuestion(
      "Ingrese el número del atributo a modificar:",
      (index: string) => {
        const attributeKeys = Object.keys(this.entity.attributes);
        const attributeName = attributeKeys[parseInt(index) - 1];
        if (!attributeName) {
          this.drawer.printError("Selección inválida.");
          setTimeout(() => this.modifyAttribute(callback), 2000);
          return;
        }

        this.displayModificationOptions(attributeName, callback);
      }
    );
  }

  private displayModificationOptions(
    attributeName: string,
    callback: Function
  ): void {
    this.drawer.printTitle("Opciones de modificación:");
    this.drawer.printMessage("1. Cambiar nombre del atributo");
    this.drawer.printMessage("2. Cambiar tipo del atributo");
    this.drawer.printMessage("3. Cambiar opcionalidad del atributo");

    this.drawer.askQuestion("Seleccione una opción:", (choice) => {
      switch (choice) {
        case "1":
          this.changeAttributeName(attributeName, callback);
          break;
        case "2":
          this.changeAttributeType(attributeName, callback);
          break;
        case "3":
          this.toggleAttributeOptionality(attributeName, callback);
          break;
        default:
          this.drawer.printError("Opción no válida.");
          setTimeout(
            () => this.displayModificationOptions(attributeName, callback),
            2000
          );
      }
    });
  }

  private changeAttributeName(attributeName: string, callback: Function): void {
    this.drawer.askQuestion(
      "Ingrese el nuevo nombre para el atributo:",
      (newName) => {
        if (newName.trim() === "" || this.entity.attributes[newName.trim()]) {
          this.drawer.printError("Nombre inválido o ya existente.");
          setTimeout(
            () => this.changeAttributeName(attributeName, callback),
            2000
          );
          return;
        }
        this.entity.attributes[newName.trim()] = {
          ...this.entity.attributes[attributeName],
        };
        delete this.entity.attributes[attributeName];
        this.drawer.printMessage(
          `Nombre del atributo cambiado de '${attributeName}' a '${newName.trim()}'.`
        );
        callback();
      }
    );
  }

  private changeAttributeType(attributeName: string, callback: Function): void {
    this.drawer.askQuestion(
      "Ingrese el nuevo tipo para el atributo:",
      (newType) => {
        if (!validTypes.has(newType.trim())) {
          this.drawer.printError(
            `Tipo '${newType.trim()}' no es válido. Tipos válidos: ${Array.from(
              validTypes
            ).join(", ")}.`
          );
          setTimeout(
            () => this.changeAttributeType(attributeName, callback),
            2000
          );
          return;
        }
        this.entity.attributes[attributeName].type = newType.trim();
        this.drawer.printMessage(
          `Tipo del atributo '${attributeName}' cambiado a '${newType.trim()}'.`
        );
        callback();
      }
    );
  }

  private toggleAttributeOptionality(
    attributeName: string,
    callback: Function
  ): void {
    this.drawer.askQuestion("El atributo es opcional? (s/n):", (answer) => {
      const isOptional = answer.trim().toLowerCase() === "s";
      this.entity.attributes[attributeName].optional = isOptional;
      this.drawer.printMessage(
        `Opcionalidad del atributo '${attributeName}' cambiada a '${
          isOptional ? "Sí" : "No"
        }'.`
      );
      callback();
    });
  }

  close() {
    this.drawer.close();
  }
}

export { AttributeEditor };
