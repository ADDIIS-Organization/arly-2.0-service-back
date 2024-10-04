import { TenantContextService } from "@/core/application/services/tenant";
import { BankTransactionExcelService } from "@/core/application/services/tenant/bank-excel.service";
import { BankTransactionExcelValidator } from "@/core/application/services/validators/banktransaction-excel-validator";
import { BankTransactionExcelController } from "@/infrastructure/adapters/inbound/http/controllers/tenant/bank-transaction-excel.controller";
import { BankTransactionsRepository } from "@/infrastructure/adapters/outbound/repositories/tenant/bank-transactions-repository.adapter";
import { BankTransactionEntity } from "@/infrastructure/persistence/tenant";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([BankTransactionEntity])],
  controllers: [BankTransactionExcelController],
  providers: [BankTransactionsRepository, BankTransactionEntity , BankTransactionExcelService , TenantContextService,

    {
      provide: 'BankTransactionExcelValidatorPort',
      useClass: BankTransactionExcelValidator,
    }
  ],
  exports: [BankTransactionsRepository],
})
export class BankTransactionModule {}