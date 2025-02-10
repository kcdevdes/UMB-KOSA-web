/**
 * EventsTab Component
 * Show the list of events and allow admin to add, edit, and delete events
 */

'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  CldUploadWidget,
  CldUploadWidgetProps,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import { Button, Modal, Table, TextInput, Textarea } from 'flowbite-react';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  location: string;
  start_date: Timestamp;
  end_date: Timestamp;
  description: string;
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  thumbnails: string[]; // Allow up to 3 images
}

export default function EventsTab() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<
    Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
  >({
    title: '',
    location: '',
    start_date: Timestamp.now(),
    end_date: Timestamp.now(),
    description: '',
    thumbnails: [],
    author: '',
  });
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Fetch all events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];

      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // If the upload is successful, add the image URL to the thumbnails array
  const handleUploadSuccess: CldUploadWidgetProps['onSuccess'] = (result) => {
    if (
      result.event === 'success' &&
      result.info &&
      typeof result.info !== 'string'
    ) {
      const info = result.info as CloudinaryUploadWidgetInfo;

      setNewEvent((prev) => {
        if (prev.thumbnails.length >= 3) {
          setImageError(true);
          return prev;
        }
        return { ...prev, thumbnails: [...prev.thumbnails, info.secure_url] };
      });
    }
  };

  const saveEvent = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert('⚠️ You must be logged in to add an event.');
      return;
    }

    // Validate the form
    if (!newEvent.title.trim()) {
      alert('⚠️ Please enter an event title.');
      return;
    }
    if (!newEvent.location.trim()) {
      alert('⚠️ Please enter an event location.');
      return;
    }

    // Validate if the end date is later than the start date
    const startMillis = newEvent.start_date.toDate().getTime();
    const endMillis = newEvent.end_date.toDate().getTime();
    if (startMillis >= endMillis) {
      alert('⚠️ End date & time must be later than Start date & time.');
      return;
    }

    const eventData = {
      ...newEvent,
      start_date: Timestamp.fromDate(newEvent.start_date.toDate()),
      end_date: Timestamp.fromDate(newEvent.end_date.toDate()),
      updatedAt: Timestamp.now(),
      author: currentUser.email || 'Unknown',
    };

    if (editEventId) {
      // Update an existing document
      const eventRef = doc(db, 'events', editEventId);
      await updateDoc(eventRef, eventData);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editEventId ? { ...event, ...eventData } : event
        )
      );
      setEditEventId(null);
    } else {
      // Create a new document
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        createdAt: serverTimestamp(),
      });

      // Update the document with the generated ID
      await updateDoc(docRef, { id: docRef.id });

      // Add the new event to the local state
      const createdAt = Timestamp.now();
      setEvents([
        ...events,
        {
          id: docRef.id, // identifier for the document
          createdAt,
          ...eventData,
        },
      ]);
    }

    resetForm();
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      location: '',
      start_date: Timestamp.now(),
      end_date: Timestamp.now(),
      description: '',
      thumbnails: [],
      author: '',
    });
    setModalOpen(false);
    setDateError(null);
    setImageError(false);
  };

  const formatDateTimeForInput = (timestamp: Timestamp) => {
    return timestamp.toDate().toISOString().slice(0, 16);
  };

  const handleDateTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'start_date' | 'end_date'
  ) => {
    const inputDate = new Date(e.target.value);
    const localOffset = inputDate.getTimezoneOffset();
    const adjustedDate = new Date(inputDate.getTime() - localOffset * 60000);
    const timestamp = Timestamp.fromDate(adjustedDate);

    setNewEvent((prev) => ({ ...prev, [field]: timestamp }));
  };

  // US-EN date format: MMM DD, YYYY HH:MM AM/PM (e.g. Jan 01, 2022 12:00 PM)
  // I personally prefer an international date format (YYYY-MM-DD HH:MM) but I am studying at a US university LOL
  // It's so lucky that I don't need to use Ferenheit and Miles in this project AHAHAHA
  const formatDateTimeForDisplay = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleEditEvent = (event: Event) => {
    setNewEvent({
      title: event.title,
      location: event.location,
      start_date: event.start_date,
      end_date: event.end_date,
      description: event.description,
      thumbnails: event.thumbnails || [],
      author: event.author,
    });
    setEditEventId(event.id);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Events Management</h2>
      <Button onClick={() => setModalOpen(true)}>Add New Event</Button>

      <Table className="mt-4">
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Start Date</Table.HeadCell>
          <Table.HeadCell>End Date</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Images</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {events.map((event) => (
            <tr key={event.id}>
              <Table.Cell>{event.title}</Table.Cell>
              <Table.Cell>{event.location}</Table.Cell>
              <Table.Cell>
                {formatDateTimeForDisplay(event.start_date)}
              </Table.Cell>
              <Table.Cell>
                {formatDateTimeForDisplay(event.end_date)}
              </Table.Cell>
              <Table.Cell>{event.author || 'Unknown'}</Table.Cell>
              <Table.Cell>
                {event.thumbnails?.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`Event Image ${idx + 1}`}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                  />
                ))}
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="xs"
                  color="yellow"
                  onClick={() => handleEditEvent(event)}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  color="red"
                  onClick={() => deleteEvent(event.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </Table.Cell>
            </tr>
          ))}
        </Table.Body>
      </Table>

      <Modal show={modalOpen} onClose={resetForm}>
        <Modal.Header>
          {editEventId ? 'Edit Event' : 'Add New Event'}
        </Modal.Header>
        <Modal.Body>
          <p>Title</p>
          <TextInput
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            placeholder="Event Name"
          />

          <p>Location</p>
          <TextInput
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            placeholder="Location"
          />

          <p>Start Date & Time</p>
          <TextInput
            name="start_date"
            type="datetime-local"
            value={formatDateTimeForInput(newEvent.start_date)}
            onChange={(e) => handleDateTimeChange(e, 'start_date')}
          />

          <p>End Date & Time</p>
          <TextInput
            name="end_date"
            type="datetime-local"
            value={formatDateTimeForInput(newEvent.end_date)}
            onChange={(e) => handleDateTimeChange(e, 'end_date')}
          />
          {dateError && <p className="text-red-500">{dateError}</p>}

          <p>Description</p>
          <Textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            placeholder="Event Description"
            rows={10}
            className="w-full border p-2 rounded-md mb-4"
          />

          <CldUploadWidget
            uploadPreset="umass-kosa-assets"
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <Button onClick={() => open()}>Upload Images</Button>
            )}
          </CldUploadWidget>

          {newEvent.thumbnails.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt="Thumbnail"
              width={128}
              height={128}
              className="mt-2"
            />
          ))}
          {imageError && (
            <p className="text-red-500">
              ⚠️ You can upload up to 3 images only.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveEvent} color="blue">
            {editEventId ? 'Update' : 'Add'}
          </Button>
          <Button color="gray" onClick={resetForm}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
