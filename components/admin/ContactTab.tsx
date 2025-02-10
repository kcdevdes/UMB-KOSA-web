/**
 * ContactTab component
 * Render the list of contact messages
 */

'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function ContactTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      setContacts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[]
      );
    };
    fetchContacts();
  }, []);

  // Delete a contact
  const deleteContact = async (id: string) => {
    await deleteDoc(doc(db, 'contacts', id));
    setContacts(contacts.filter((c) => c.id !== id));
  };

  // Render the list of contacts
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Contact Messages</h2>
      <ul className="mt-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="border-b py-2">
            <div>
              <strong>
                {contact.name} ({contact.email})
              </strong>
              <p>{contact.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(contact.date).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => deleteContact(contact.id)}
              className="text-red-500 mt-2"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
