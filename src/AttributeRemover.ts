import TerminalDrawer from "./TerminalDrawer";
import { IEntity } from "./interfaces/IEntity";

class AttributeRemover {
  private drawer: TerminalDrawer;
  private entity: IEntity;

  constructor(entity: IEntity, drawer: TerminalDrawer) {
    this.drawer = drawer;
    this.entity = entity;
  }

  removeAttribute(callback: Function): void {
    this.drawer.clearScreen();
    this.drawer.printTitle("Seleccione el atributo que desea eliminar:");

    Object.keys(this.entity.attributes).forEach((key, index) => {
      this.drawer.printMessage(`${index + 1}. ${key}`);
    });

    this.drawer.askQuestion("> ", (index) => {
      const attributeKeys = Object.keys(this.entity.attributes);
      const attributeName = attributeKeys[parseInt(index) - 1];
      if (!attributeName) {
        this.drawer.printError("Selección inválida.");
        setTimeout(() => this.removeAttribute(callback), 2000); // Reintentar
        return;
      }

      this.confirmDeletion(attributeName, callback);
    });
  }

  private confirmDeletion(attributeName: string, callback: Function): void {
    this.drawer.askQuestion(
      `Está seguro que desea eliminar el atributo '${attributeName}'? (s/n):`,
      (answer) => {
        if (answer.toLowerCase() === "s") {
          delete this.entity.attributes[attributeName];
          this.drawer.printMessage(
            `Atributo '${attributeName}' eliminado correctamente.`
          );
          callback(); // Regresa al menú de la entidad
        } else {
          this.drawer.printMessage("Eliminación cancelada.");
          callback(); // Regresa al menú de la entidad
        }
      }
    );
  }

  close() {
    this.drawer.close();
  }
}

export { AttributeRemover };
