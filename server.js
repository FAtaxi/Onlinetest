const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
  origin: 'https://fataxi.github.io', // Vervang door je front-end domein
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Access-Control-Allow-Private-Network'],
};

app.use(cors(corsOptions));

// Twilio configuratie
const accountSid = 'AC62065d08cb81f65011732cf3a80694f5'; // Vervang door je Twilio Account SID
const authToken = 'f8b5284f7b1f9dff52c6eec96476f0f8'; // Vervang door je Twilio Auth Token
const client = twilio(accountSid, authToken);

const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio WhatsApp nummer

app.get('/', (req, res) => {
  res.send('Welkom bij de Twilio API server! Stuur een POST-verzoek naar /send om een bericht te verzenden.');
});

app.post('/send', async (req, res) => {
  const { message, toWhatsAppNumber } = req.body; // Nu kun je ook een nummer vanuit de request krijgen

  // Verifieer of het bericht en het nummer zijn meegegeven
  if (!message || !toWhatsAppNumber) {
    return res.status(400).json({ success: false, error: 'Bericht en/of nummer wordt niet meegegeven' });
  }

  try {
    const msg = await client.messages.create({
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber, // Gebruik het nummer dat is meegegeven in de body
      body: message,
    });

    res.setHeader('Access-Control-Allow-Private-Network', 'true'); // Voeg de header toe
    res.status(200).json({ success: true, sid: msg.sid });
  } catch (err) {
    console.error('Fout bij het verzenden via Twilio:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start de server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
