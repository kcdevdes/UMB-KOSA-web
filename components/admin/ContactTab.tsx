'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Modal, Button, Textarea, Alert, Card } from 'flowbite-react';
import QueryMessage from '@/lib/entity/QueryMessage';

export default function ContactTab() {
  const [contacts, setContacts] = useState<QueryMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<QueryMessage | null>(
    null
  );
  const [replyText, setReplyText] = useState('');
  const [status, setStatus] = useState('');

  // Fetch all contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      setContacts(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            sender: data.sender,
            message: data.message,
            reply: data.reply,
            sentAt: data.sentAt,
            isAnswered: data.isAnswered,
          } as QueryMessage;
        })
      );
    };
    fetchContacts();
  }, []);

  // Handle message selection
  const handleSelectMessage = (contact: QueryMessage) => {
    setSelectedMessage(contact);
    setReplyText(contact.reply); // Load existing reply if available
  };

  // Send email reply using Nodemailer API
  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setStatus('Sending...');

    try {
      const response = await fetch('/api/email/sendReply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedMessage.sender,
          message: replyText,
        }),
      });

      if (response.ok) {
        // Update Firestore with reply message
        await updateDoc(doc(db, 'contacts', selectedMessage.id), {
          reply: replyText,
          isAnswered: true,
        });

        // Update local state
        setContacts((prev) =>
          prev.map((c) =>
            c.id === selectedMessage.id
              ? { ...c, reply: replyText, isAnswered: true }
              : c
          )
        );

        setStatus('Reply sent successfully!');
        setSelectedMessage(null);
        setReplyText('');
      } else {
        setStatus('Failed to send reply.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className={`cursor-pointer ${
              contact.isAnswered ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => handleSelectMessage(contact)}
          >
            <h5 className="text-lg font-medium">{contact.sender}</h5>
            <p className="text-sm text-gray-700 truncate">{contact.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(contact.sentAt.toDate()).toLocaleString()}
            </p>
          </Card>
        ))}
      </div>

      {/* Reply Modal */}
      <Modal show={!!selectedMessage} onClose={() => setSelectedMessage(null)}>
        <Modal.Header>Reply to {selectedMessage?.sender}</Modal.Header>
        <Modal.Body>
          <Textarea
            className="w-full mt-2"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply here..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSendReply} color="blue">
            Send Reply
          </Button>
          <Button onClick={() => setSelectedMessage(null)} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {status && (
        <Alert color="blue" className="mt-4">
          {status}
        </Alert>
      )}
    </div>
  );
}
