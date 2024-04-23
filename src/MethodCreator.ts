import TerminalDrawer from "./TerminalDrawer";
import { IMethod, IEntity, IInterface } from "./interfaces";

class MethodCreator {
  private drawer: TerminalDrawer;
  private entity: IEntity;

  constructor(entity: IEntity) {
    this.drawer = new TerminalDrawer();
    this.entity = entity;
  }

  createMethod(callback: Function): void {
    this.drawer.clearScreen();
    this.drawer.printTitle(
      `Crear nuevo método para la entidad: ${this.entity.name}`
    );

    this.drawer.askQuestion("Ingrese el nombre del método", (methodName) => {
      if (!methodName.trim()) {
        this.drawer.printError("El nombre del método no puede estar vacío.");
        setTimeout(() => this.createMethod(callback), 2000);
        return;
      }

      if (this.entity.methods.hasOwnProperty(methodName.trim())) {
        this.drawer.printError("Un método con ese nombre ya existe.");
        setTimeout(() => this.createMethod(callback), 2000);
        return;
      }

      const newMethod: IMethod = {
        name: methodName.trim(),
        inputInterface: null, // Inicialmente null
        outputInterface: null, // Inicialmente null
      };

      // Procesar la creación de la interfaz de entrada
      this.createInterface(true, newMethod, () => {
        // Procesar la creación de la interfaz de salida
        this.createInterface(false, newMethod, () => {
          this.entity.methods[methodName.trim()] = newMethod;
          this.drawer.printMessage(
            `Método '${methodName.trim()}' creado con éxito.`
          );
          callback(); // Regresar al menú principal o continuar con otro flujo
        });
      });
    });
  }

  private createInterface(
    isInput: boolean,
    method: IMethod,
    callback: Function
  ): void {
    const type = isInput ? "entrada" : "salida";
    this.drawer.printSubTitle(
      `Crear interfaz de ${type} para el método: ${method.name}`
    );

    // Simulación de creación de interfaz. Reemplazar con lógica real.
    let newInterface: IInterface = {
      name: method.name + "_" + type,
      attributes: {},
    };

    if (isInput) {
      method.inputInterface = newInterface;
    } else {
      method.outputInterface = newInterface;
    }
    callback();
  }
}

export default MethodCreator;
