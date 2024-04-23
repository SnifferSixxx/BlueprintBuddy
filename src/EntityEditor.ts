import TerminalDrawer from "./TerminalDrawer";
import { IEntity } from "./interfaces/IEntity";
import { EntityMenu } from "./EntityMenu";

class EntityEditor {
  private drawer: TerminalDrawer;
  private entities: IEntity[];

  constructor(entities: IEntity[], drawer: TerminalDrawer) {
    this.entities = entities;
    this.drawer = drawer;
  }

  editExistingEntity(callback: Function): void {
    if (this.entities.length === 0) {
      this.drawer.printError(
        "No existen entidades para editar. Por favor, cree una entidad primero."
      );
      callback();
      return;
    }

    this.drawer.clearScreen();
    this.drawer.printTitle("-- Editar una Entidad Existente --");
    this.entities.forEach((entity, index) => {
      this.drawer.printMessage(`${index + 1}: ${entity.name}`);
    });

    this.drawer.askQuestion(
      "Seleccione la entidad que desea editar (ingrese el número):",
      (input: string) => {
        const index = parseInt(input) - 1;
        if (
          !input ||
          isNaN(index) ||
          index < 0 ||
          index >= this.entities.length
        ) {
          this.drawer.printError(
            "Selección inválida. Por favor, elija un número de la lista."
          );
          setTimeout(() => this.editExistingEntity(callback), 2000);
          return;
        }

        const selectedEntity = this.entities[index];
        const entityMenuInstance = new EntityMenu(selectedEntity, this.drawer);
        entityMenuInstance.entityMenu(callback);
      }
    );
  }

  close() {
    this.drawer.close();
  }
}

export default EntityEditor;
