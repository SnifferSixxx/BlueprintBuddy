export function isValidAttributeName(name: string): boolean {
  // Verifica que el nombre no tenga espacios, no contenga números y solo un '?' opcional al final.
  return /^[a-zA-Z]+[?]?$/.test(name);
}
