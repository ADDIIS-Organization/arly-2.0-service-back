import { VerifyCediCashResponseDto } from '@/infrastructure/dtos/tenant/arly-1/verify-cedi-cash-response.dto';

/**
 * Interface representing the application port for Arly1 Detalleturno.
 */
export interface IArly1MuelleAgendaApplicationPort {
    /**
     * Verifies the cash amount for a given CEDI (Centro de Distribución).
     *
     * @param cediId - The identifier of the CEDI.
     * @param cashAmount - The amount of cash to verify.
     * @returns A promise that resolves to a VerifyCediCashResponseDto.
     */
    verifyCediCash(
        cediId: string,
        cashAmount: number,
    ): Promise<VerifyCediCashResponseDto>;
}