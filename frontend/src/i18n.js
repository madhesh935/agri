import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "title": "Road SOS",
      "location": "Your Location",
      "contacts": "Emergency Contacts",
      "sos_button": "SEND SOS",
      "sos_active": "SOS ACTIVE",
      "sos_msg": "Press the button in case of emergency.",
      "sos_active_msg": "Emergency services have been notified.",
      "add_contact": "Add",
      "cancel_contact": "Cancel",
      "contact_name": "Name",
      "contact_phone": "Phone Number",
      "contact_rel": "Relationship",
      "no_contacts": "No contacts added yet.",
      "call": "Call"
    }
  },
  es: {
    translation: {
      "title": "SOS Vial",
      "location": "Tu Ubicación",
      "contacts": "Contactos de Emergencia",
      "sos_button": "ENVIAR SOS",
      "sos_active": "SOS ACTIVO",
      "sos_msg": "Presione el botón en caso de emergencia.",
      "sos_active_msg": "Los servicios de emergencia han sido notificados.",
      "add_contact": "Agregar",
      "cancel_contact": "Cancelar",
      "contact_name": "Nombre",
      "contact_phone": "Número de Teléfono",
      "contact_rel": "Relación",
      "no_contacts": "Aún no se han agregado contactos.",
      "call": "Llamar"
    }
  },
  hi: {
    translation: {
      "title": "रोड एसओएस",
      "location": "आपका स्थान",
      "contacts": "आपातकालीन संपर्क",
      "sos_button": "एसओएस भेजें",
      "sos_active": "एसओएस सक्रिय",
      "sos_msg": "आपातकालीन स्थिति में बटन दबाएं।",
      "sos_active_msg": "आपातकालीन सेवाओं को सूचित कर दिया गया है।",
      "add_contact": "जोड़ें",
      "cancel_contact": "रद्द करें",
      "contact_name": "नाम",
      "contact_phone": "फ़ोन नंबर",
      "contact_rel": "रिश्ता",
      "no_contacts": "अभी तक कोई संपर्क नहीं जोड़ा गया है।",
      "call": "कॉल करें"
    }
  }
};

i18n
  .use(LanguageDetector())
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escape: false
    }
  });

export default i18n;
