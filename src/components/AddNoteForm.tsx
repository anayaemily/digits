/* eslint-disable react/prop-types */

'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { useRouter } from 'next/navigation';

interface AddNoteFormProps {
  contactId: number;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ contactId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      note: '',
      contactId,
      owner: currentUser,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await addNote({
        note: data.note,
        contactId,
        owner: currentUser,
      });
      reset();
      router.refresh(); // Refresh the page to show the new note
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="mt-3">
      <Card>
        <Card.Header>
          <h6 className="text-center mb-0">Add Timestamped Note</h6>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" {...register('note')} isInvalid={!!errors.note} className="rounded" />
              <Form.Control.Feedback type="invalid">{errors.note?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" className="rounded">
                Submit
              </Button>
              <Button type="button" variant="warning" onClick={() => reset()} className="rounded">
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNoteForm;
