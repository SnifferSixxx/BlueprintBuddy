import TerminalDrawer from "./TerminalDrawer";
import { IInterface, IMethod } from "./interfaces";

class InterfaceCreator {
  private drawer: TerminalDrawer;
  private method: IMethod;

  constructor(method: IMethod) {
    this.drawer = new TerminalDrawer();
    this.method = method;
  }

  createInterface(isInput: boolean, callback: Function) {
    this.drawer.clearScreen();
    const type = isInput ? "entrada" : "salida";
    this.drawer.printTitle(
      `Crear interfaz de ${type} para el método: ${this.method.name}`
    );

    this.drawer.askQuestion(
      `Ingrese el nombre de la interfaz de ${type}`,
      (name) => {
        if (!name.trim()) {
          this.drawer.printError(
            "El nombre de la interfaz no puede estar vacío."
          );
          setTimeout(() => this.createInterface(isInput, callback), 2000);
          return;
        }

        const newInterface: IInterface = { name: name.trim(), attributes: {} };

        // Asignar la nueva interfaz a la entrada o salida del método
        if (isInput) {
          if (this.method.inputInterface) {
            this.drawer.printError(
              "Este método ya tiene una interfaz de entrada definida."
            );
            setTimeout(() => this.createInterface(isInput, callback), 2000);
            return;
          }
          this.method.inputInterface = newInterface;
        } else {
          if (this.method.outputInterface) {
            this.drawer.printError(
              "Este método ya tiene una interfaz de salida definida."
            );
            setTimeout(() => this.createInterface(isInput, callback), 2000);
            return;
          }
          this.method.outputInterface = newInterface;
        }

        this.drawer.printMessage(
          `Interfaz de ${type} '${name.trim()}' creada con éxito.`
        );
        callback(); // Regresar al menú anterior o continuar con otro flujo
      }
    );
  }

  close() {
    this.drawer.close();
  }
}

export default InterfaceCreator;
