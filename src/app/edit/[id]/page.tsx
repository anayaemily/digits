import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Contact } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditcontactForm from '@/components/EditContactForm';

export default async function EditContactForm({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const contact: Contact | null = await prisma.contact.findUnique({
    where: { id },
  });
  // console.log(contact);
  if (!contact) {
    return notFound();
  }

  return (
    <main>
      <EditcontactForm contact={contact} />
    </main>
  );
}
