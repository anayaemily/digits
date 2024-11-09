'use client';

import { Card, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact, Note } from '@prisma/client';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

interface ContactCardProps {
  contact: Contact;
  notes: Note[];
}

const ContactCard = ({ contact, notes = [] }: ContactCardProps) => (
  <Card className="h-100">
    <Card.Body>
      <div className="mb-3">
        <Card.Img variant="top" src={contact.image} style={{ width: '75px', height: '75px', objectFit: 'cover' }} />
      </div>
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
      <AddNoteForm contactId={contact.id} />
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
