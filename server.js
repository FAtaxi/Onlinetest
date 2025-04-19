const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const accountSid = 'AC62065d08cb81f65011732cf3a80694f5'; // Twilio Account SID
const authToken = 'f8b5284f7b1f9dff52c6eec96476f0f8'; // Twilio Auth Token
const client = twilio(accountSid, authToken);

const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Van nummer
const toWhatsAppNumber = 'whatsapp:+31647972301'; // Naar nummer

app.post('/send', async (req, res) => {
  const { message } = req.body;

  // Controleer of er een bericht is verzonden
  if (!message) {
    return res.status(400).json({ success: false, error: 'Bericht wordt niet meegegeven' });
  }

  try {
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
const PORT = 3000; // Hardcoded port number for testing
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
