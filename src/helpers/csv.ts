export interface json2CsvDefaultValues {
  undefined?: string,
  null?: string,
}

export function json2Csv(columns: string[], data: object[], separatorString: string = ',', defaultValues? :json2CsvDefaultValues): string {
  let csv = [...columns].map((column) => `"${column}"`).join(separatorString);

  const separator = (index: number): string => (index ? separatorString : '');
  const getCellValue = (value: any): string => {
    if (value === undefined) {
      if (defaultValues?.undefined !== undefined) return defaultValues.undefined;
      return '';
    }

    if (value === null && defaultValues?.null !== undefined) {
      return defaultValues.null;
    }

    return typeof value === 'string' ? `"${value}"` : value;
  };

  data.forEach((item) => {
    csv = csv.concat("\n"); // new line
    columns.forEach((column, index) => {
      csv = csv.concat(`${separator(index)}${getCellValue(item[column])}`); // cell value
    });
  });
  return csv;
}
