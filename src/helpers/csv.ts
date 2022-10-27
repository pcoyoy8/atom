export function json2Csv(columns: string[], data: object[]): string {
  let csv = [...columns].map((column) => `"${column}"`).join();

  const separator = (index: number): string => (index ? "," : "");
  const getCellValue = (value: any): string => {
    if (value === undefined) return "";
    return typeof value === "string" ? `"${value}"` : value;
  };

  data.forEach((item) => {
    csv = csv.concat("\n"); // new line
    columns.forEach((column, index) => {
      csv = csv.concat(`${separator(index)}${getCellValue(item[column])}`); // cell value
    });
  });
  return csv;
}
