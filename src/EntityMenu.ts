import AttributeCreator from "./AttributeCreator";
import { AttributeEditor } from "./AttributeEditor";
import { AttributeRemover } from "./AttributeRemover";
import { IEntity } from "./interfaces";
import TerminalDrawer from "./TerminalDrawer";

class EntityMenu {
  private drawer: TerminalDrawer;
  private entity: IEntity;
  private attributeCreator: AttributeCreator;
  private attributeEditor: AttributeEditor;
  private attributeRemover: AttributeRemover;

  constructor(entity: IEntity, drawer: TerminalDrawer) {
    this.drawer = drawer;
    this.entity = entity;
    this.attributeCreator = new AttributeCreator(this.entity, this.drawer);
    this.attributeEditor = new AttributeEditor(this.entity, this.drawer);
    this.attributeRemover = new AttributeRemover(this.entity, this.drawer);
  }

  showEntityDetails() {
    this.drawer.clearScreen();
    this.drawer.printTitle(`Menú de la entidad: ${this.entity.name}`);
    this.drawer.printSubTitle("Atributos actuales:");
    Object.keys(this.entity.attributes).forEach((key, index) => {
      const attr = this.entity.attributes[key];
      this.drawer.printMessage(
        `${index + 1}. ${key}${attr.optional ? "?" : ""}: ${attr.type}`
      );
    });
  }

  displayMenuOptions() {
    this.drawer.printMessage("\nOpciones:");
    this.drawer.printMessage("1. Añadir atributo");
    this.drawer.printMessage("2. Modificar atributo");
    this.drawer.printMessage("3. Eliminar atributo");
    this.drawer.printMessage("4. Volver al menú principal");
  }

  handleMenuSelection(callback: Function) {
    this.drawer.askQuestion("Seleccione una opción", (option) => {
      switch (option) {
        case "1":
          this.attributeCreator.createAttribute(() =>
            this.entityMenu(callback)
          );
          break;
        case "2":
          if (Object.keys(this.entity.attributes).length === 0) {
            this.drawer.printError(
              "No hay atributos para modificar. Por favor, añada uno primero."
            );
            setTimeout(() => this.entityMenu(callback), 2000);
            return;
          }
          this.attributeEditor.modifyAttribute(() => this.entityMenu(callback));
          break;
        case "3":
          if (Object.keys(this.entity.attributes).length === 0) {
            this.drawer.printError(
              "No hay atributos para eliminar. Por favor, añada uno primero."
            );
            setTimeout(() => this.entityMenu(callback), 2000);
            return;
          }
          this.attributeRemover.removeAttribute(() =>
            this.entityMenu(callback)
          );
          break;
        case "4":
          console.log("Regresando al menú principal...");
          callback(); // Regresa al menú principal
          break;
        default:
          this.drawer.printError(
            "Opción no válida, por favor intente de nuevo."
          );
          this.entityMenu(callback);
          break;
      }
    });
  }

  entityMenu(callback: Function): void {
    this.showEntityDetails();
    this.displayMenuOptions();
    this.handleMenuSelection(callback);
  }
}

export { EntityMenu };
