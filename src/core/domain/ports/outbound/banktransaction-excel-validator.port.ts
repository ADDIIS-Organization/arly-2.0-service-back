export interface BankTransactionExcelValidatorPort {
  validateColumns(columns: string[]): boolean;
}