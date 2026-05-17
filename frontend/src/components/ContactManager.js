import React, { useState } from 'react';
import axios from 'axios';
import { User, Phone, Plus, Trash2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

const ContactManager = ({ userId, onContactsUpdated }) => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone_number: '', relationship: '' });
  const [isAdding, setIsAdding] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/contacts`, { params: { user_id: userId } });
      setContacts(response.data);
      if (onContactsUpdated) onContactsUpdated(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  React.useEffect(() => {
    fetchContacts();
  }, [userId]);

  const addContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users/contacts`, newContact, { params: { user_id: userId } });
      setNewContact({ name: '', phone_number: '', relationship: '' });
      setIsAdding(false);
      await fetchContacts();
    } catch (error) {
      alert("Failed to add contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/contacts/${id}`, { params: { user_id: userId } });
      await fetchContacts();
    } catch (error) {
      alert("Failed to delete contact");
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Phone size={20} className="text-blue-500" /> Emergency Contacts
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={addContact} className="mb-6 space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <input 
            className="w-full p-2 border rounded-lg" 
            placeholder="Name" 
            value={newContact.name} 
            onChange={e => setNewContact({...newContact, name: e.target.value})} 
            required 
          />
          <input 
            className="w-full p-2 border rounded-lg" 
            placeholder="Phone Number" 
            value={newContact.phone_number} 
            onChange={e => setNewContact({...newContact, phone_number: e.target.value})} 
            required 
          />
          <input 
            className="w-full p-2 border rounded-lg" 
            placeholder="Relationship (e.g. Dad)" 
            value={newContact.relationship} 
            onChange={e => setNewContact({...newContact, relationship: e.target.value})} 
            required 
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white p-2 rounded-lg font-medium">Add</button>
            <button type="button" onClick={() => setIsAdding(false)} className="flex-1 bg-gray-300 text-gray-700 p-2 rounded-lg font-medium">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No contacts added yet.</p>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group">
              <div>
                <div className="font-medium text-gray-800">{contact.name}</div>
                <div className="text-xs text-gray-500">{contact.relationship}</div>
              </div>
              <div className="flex gap-3 items-center">
                <a href={`tel:${contact.phone_number}`} className="text-blue-600 font-medium hover:underline">Call</a>
                <button onClick={() => deleteContact(contact.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactManager;
