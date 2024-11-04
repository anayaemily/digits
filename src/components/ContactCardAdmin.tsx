'use client';

import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

interface ContactCardProps {
  contact: Contact;
}

const ContactCardAdmin = ({ contact }: ContactCardProps) => (
  <Card className="h-100 p-0.3">
    <Card.Body className="d-flex flex-column">
      <Card.Img
        variant="top"
        src={contact.image ?? undefined}
        style={{ width: '75px', height: '75px', objectFit: 'cover', marginBottom: '15px' }}
      />
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;