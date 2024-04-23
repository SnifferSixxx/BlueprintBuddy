import EntityEditor from "./EntityEditor";
import TerminalDrawer from "./TerminalDrawer";
import { IEntity } from "./interfaces/IEntity";

class EntityCreator {
  private drawer: TerminalDrawer;
  private entities: IEntity[];

  constructor(entities: IEntity[], drawer: TerminalDrawer) {
    this.drawer = drawer;
    this.entities = entities;
  }

  async createEntity(callback: Function) {
    this.drawer.clearScreen();
    this.drawer.printTitle("Crear Nueva Entidad");

    this.drawer.askQuestion(
      "Ingrese el nombre de la nueva entidad",
      async (name) => {
        if (!name.trim()) {
          this.drawer.printError(
            "El nombre de la entidad no puede estar vacío."
          );
          setTimeout(() => this.createEntity(callback), 2000); // Reintenta después de un breve retraso
          return;
        }

        if (this.entities.some((e) => e.name === name.trim())) {
          this.drawer.printError(
            "Una entidad con este nombre ya existe. Por favor, elija un nombre diferente."
          );
          setTimeout(() => this.createEntity(callback), 2000); // Reintenta después de un breve retraso
          return;
        }

        const newEntity: IEntity = {
          name: name.trim(),
          attributes: {},
          methods: {},
        };
        this.entities.push(newEntity);
        this.drawer.printMessage(
          `Entidad '${newEntity.name}' creada con éxito!`
        );

        callback();
      }
    );
  }

  close() {
    this.drawer.close();
  }
}

export default EntityCreator;
