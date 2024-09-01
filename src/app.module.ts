// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CoreModule } from './core/core.module';
// import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './infrastructure/modules/role.module';
import { databaseConfig } from './infrastructure/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    RoleModule,
  ],
})
export class AppModule {}

// @Module({
//   imports: [CoreModule, InfraestructureModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}