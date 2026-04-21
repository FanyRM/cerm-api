import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter }) as any;

async function main() {
  // Crear roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });

  console.log('Roles creados:', adminRole.name, userRole.name);

  // Asignar rol ADMIN a usuarios existentes sin roles
  const usersWithoutRoles = await prisma.user.findMany({
    where: { roles: { none: {} } },
  });

  for (const user of usersWithoutRoles) {
    await prisma.userRole.create({
      data: { userId: user.id, roleId: userRole.id },
    });
    console.log(`Rol USER asignado a: ${user.username}`);
  }

  // Crear usuario admin si no existe
  const existingAdmin = await prisma.user.findFirst({
    where: { username: 'superadmin' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Super',
        lastName: 'Admin',
        username: 'superadmin',
        password: hashedPassword,
        roles: { create: { roleId: adminRole.id } },
      },
    });
    console.log(`Usuario admin creado: ${admin.username} / admin123`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
