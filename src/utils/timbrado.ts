export const cleanAndDeduplicateArray = (inputArray: string[]): string[] => {
  // Utilizar un Set para eliminar duplicados y un map para limpiar cada string
  const cleanedArray = inputArray.map(
    (item) => item.replace(/\s+/g, " ").trim() // Reemplaza múltiples espacios en blanco, incluidas tabulaciones y saltos de línea, con un solo espacio
  );

  // Convertir el array limpio en un Set para eliminar duplicados, y luego volver a convertirlo en un array
  return Array.from(new Set(cleanedArray));
};

export const cleanCell = (cell: string): string => {
  // add case undefined
  if (!cell) {
    return "";
  }
  // Reemplaza múltiples espacios en blanco, incluidas tabulaciones y saltos de línea, con un solo espacio

  return cell.replace(/\s+/g, " ").trim();
};
export const transposeMatrix = (matrix: any[][]): any[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};
