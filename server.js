// Vereiste modules importeren
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

// Nieuwe Express-app maken
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Hiermee staat CORS-verzoeken toe

// Twilio-instellingen
const accountSid = 'AC62065d08cb81f65011732cf3a80694f5'; // Vervang door je Twilio Account SID
const authToken = 'f8b5284f7b1f9dff52c6eec96476f0f8'; // Vervang door je Twilio Auth Token
const client = twilio(accountSid, authToken);

// WhatsApp-nummers
const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio WhatsApp nummer
const toWhatsAppNumber = 'whatsapp:+31647972301'; // Jouw WhatsApp nummer

// GET-route voor de root
app.get('/', (req, res) => {
  res.send('Welkom bij de Twilio API server! Stuur een POST-verzoek naar /send om een bericht te verzenden.');
});

// POST-route om een bericht te verzenden
app.post('/send', async (req, res) => {
  const { message } = req.body;

  // Controleer of het bericht is meegegeven
  if (!message) {
    return res.status(400).json({ success: false, error: 'Bericht wordt niet meegegeven' });
  }

  try {
    // Bericht verzenden via Twilio
    const msg = await client.messages.create({
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber,
      body: message,
    });
    res.status(200).json({ success: true, sid: msg.sid });
  } catch (err) {
    console.error('Fout bij het verzenden via Twilio:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Server starten op poort 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
