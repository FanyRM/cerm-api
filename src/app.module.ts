import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interfaces/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';
import { UserModule } from './modules/user/interfaces/user.module';
import { RoleModule } from './modules/role/interfaces/role.module';

@Module({
  imports: [AuthModule, TaskModule, UserModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
