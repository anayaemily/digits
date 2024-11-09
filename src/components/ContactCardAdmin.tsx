'use client';

import { Card, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@prisma/client';
import NoteItem from './NoteItem';

interface ContactCardProps {
  contact: Contact;
  notes: Note[];
}

const ContactCardAdmin = ({ contact, notes = [] }: ContactCardProps) => (
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
      <ListGroup variant="flush">{notes?.map((note) => <NoteItem key={note.id} note={note} />)}</ListGroup>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
