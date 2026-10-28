import { useMemo, useState } from 'react';
import { initialContacts } from '../data/initialContacts';
import { initialMessages } from '../data/initialMessages';
import { Contact, ContactStage, Message } from '../types/crm';

export type ChannelFilter = 'all' | 'whatsapp' | 'instagram' | 'messenger';

export function useCrmState() {
  const [contacts, setContacts] = useState(initialContacts);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [selectedContactId, setSelectedContactId] = useState('c1');
  const [newMessageText, setNewMessageText] = useState('');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [agentNotes, setAgentNotes] = useState<Record<string, string>>({
    c1: 'Cliente sumamente interesado. Solicita integración especial con WhatsApp API oficial.',
    c2: 'Enviar brochure de precios para agencias.',
    c3: 'Pendiente reunión técnica con equipo de TI.',
  });

  const selectedContact = useMemo(
    () => contacts.find((c) => c.id === selectedContactId) ?? contacts[0],
    [contacts, selectedContactId]
  );

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesChannel = channelFilter === 'all' || contact.channel === channelFilter;
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery);

      return matchesChannel && matchesSearch;
    });
  }, [contacts, channelFilter, searchQuery]);

  const updateContactStage = (contactId: string, newStage: ContactStage) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, stage: newStage } : contact
      )
    );
  };

  const sendMessage = () => {
    if (!newMessageText.trim() || !selectedContactId) return;

    const newMsg: Message = {
      id: `m_${Date.now()}`,
      sender: 'me',
      text: newMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      channel: selectedContact.channel,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMsg],
    }));

    setNewMessageText('');
  };

  const generateAiReply = () => {
    setAiLoading(true);

    setTimeout(() => {
      setNewMessageText(`Hola ${selectedContact.name}, he preparado el desglose para ${selectedContact.company}. Podemos agendar una videollamada hoy mismo para revisar la integración con WhatsApp Cloud API y el plan enterprise.`);
      setAiLoading(false);
    }, 900);
  };

  const saveNote = () => {
    if (!currentNote.trim()) return;
    setAgentNotes((prev) => ({
      ...prev,
      [selectedContactId]: currentNote,
    }));
    setCurrentNote('');
  };

  return {
    contacts,
    messages,
    selectedContact,
    selectedContactId,
    setSelectedContactId,
    newMessageText,
    setNewMessageText,
    channelFilter,
    setChannelFilter,
    searchQuery,
    setSearchQuery,
    filteredContacts,
    aiLoading,
    generateAiReply,
    currentNote,
    setCurrentNote,
    agentNotes,
    saveNote,
    sendMessage,
    updateContactStage,
  };
}
