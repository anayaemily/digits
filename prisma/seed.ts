/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  // Option 1: Clear contacts first
  await prisma.contact.deleteMany();

  // Then proceed with your seeding
  config.defaultContacts.forEach(async (contact, index) => {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName} (${contact.owner})`);
    await prisma.contact.create({
      data: {
        ...contact,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
