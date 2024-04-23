import { IEntity } from "./interfaces/IEntity";
import EntityCreator from "./EntityCreator";
import EntityEditor from "./EntityEditor";
import TerminalDrawer from "./TerminalDrawer";

class MainMenu {
  private drawer: TerminalDrawer;
  private entities: IEntity[] = []; // Este arreglo almacenará todas las entidades creadas
  private entityCreator: EntityCreator;
  private entityEditor: EntityEditor;

  constructor() {
    this.drawer = new TerminalDrawer();
    this.entityCreator = new EntityCreator(this.entities, this.drawer); // Asumiendo que EntityCreator toma entities y drawer
    this.entityEditor = new EntityEditor(this.entities, this.drawer); // Asumiendo que EntityEditor toma entities y drawer
    this.mainMenu(); // Iniciar el menú principal
  }

  mainMenu(): void {
    this.drawer.clearScreen();
    this.drawer.printTitle("Menu Principal");
    this.drawer.printMessage("1. Crear una entidad");
    this.drawer.printMessage("2. Editar una entidad existente");
    this.drawer.printMessage("3. Salir");

    this.drawer.askQuestion("Seleccione una opción", (option: string) => {
      switch (option) {
        case "1":
          this.entityCreator.createEntity(() => this.mainMenu());
          break;
        case "2":
          if (this.entities.length === 0) {
            this.drawer.printError(
              "No existe ninguna entidad. Por favor, cree una entidad primero."
            );
            setTimeout(() => this.mainMenu(), 2000); // Da tiempo para leer el mensaje
            return;
          }
          this.entityEditor.editExistingEntity(() => this.mainMenu());
          break;
        case "3":
          this.drawer.printMessage("Programa finalizado");
          this.drawer.close();
          break;
        default:
          this.drawer.printError("Opción no válida, intente de nuevo.");
          setTimeout(() => this.mainMenu(), 2000); // Da tiempo para leer el mensaje
          break;
      }
    });
  }
}

// Iniciar la aplicación
new MainMenu();
