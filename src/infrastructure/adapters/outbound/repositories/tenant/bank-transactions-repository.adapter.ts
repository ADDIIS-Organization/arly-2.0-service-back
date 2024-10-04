import { BankTransactionEntity } from "@/infrastructure/persistence/tenant";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class BankTransactionsRepository {
    constructor (
      @InjectRepository(BankTransactionEntity)
     private readonly respository : Repository<BankTransactionEntity>) {
      
    }


    async save ( transaction: BankTransactionEntity): Promise<BankTransactionEntity> {
      return this.respository.save(transaction);
    }
}