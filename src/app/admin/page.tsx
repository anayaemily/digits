/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Contact } from '@/lib/validationSchemas';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

/** Render a list of all contacts (admin view). */
const AdminPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? '' },
    select: {
      email: true,
      role: true,
    },
  });
  console.log('User attempting admin access:', {
    email: session?.user?.email,
    userFound: !!user,
    role: user?.role,
  });

  if (!user?.role?.includes('ADMIN')) {
    console.log('Access denied - not an admin');
    redirect('/');
  }

  // Fetch all contacts for admin
  const contacts = await prisma.contact.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      owner: true,
      address: true,
      image: true,
      description: true,
    },
  });

  return (
    <Container>
      <h1 className="my-4">List Contacts (Admin)</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {contacts.map((contact) => (
          <Col key={contact.id}>
            <ContactCardAdmin contact={contact} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminPage;
