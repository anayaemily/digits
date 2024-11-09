/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Contact } from '@/lib/validationSchemas';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';

/** Render a list of contacts for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch contacts and notes for the logged-in user
  const contacts = await prisma.contact.findMany({
    where: {
      owner: session?.user?.email ?? '',
    },
    include: {
      notes: true,
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Contacts</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.firstName}`}>
                  <ContactCard contact={contact} notes={contact.notes} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
