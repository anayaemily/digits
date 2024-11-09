'use client';

import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Contact } from '@prisma/client';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => (
  <Card className="h-100 p-1">
    <Card.Body className="d-flex flex-column">
      <Card.Img
        variant="top"
        src={contact.image}
        style={{ width: '75px', height: '75px', objectFit: 'cover', marginBottom: '15px' }}
      />
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
