const express = require('express'); // Correcte spelling van 'require'
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Correcte spelling van 'public'

const accountSid = 'AC62065d08cb81f65011732cf3a80694f5'; // Twilio Account SID
const authToken = 'f8b5284f7b1f9dff52c6eec96476f0f8'; // Twilio Auth Token
const client = twilio(accountSid, authToken);

const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Van nummer
const toWhatsAppNumber = 'whatsapp:+31647972301'; // Naar nummer

app.post('/send', async (req, res) => { // Endpoint '/send' in het Engels
  const { message } = req.body; // Variabele 'message'

  try {
    const msg = await client.messages.create({ // Wacht op de creatie van het bericht
      from: fromWhatsAppNumber, // Van nummer
      to: toWhatsAppNumber, // Naar nummer
      body: message, // Bericht
    });
    res.status(200).json({ success: true, sid: msg.sid }); // Antwoord met succes
  } catch (err) {
    console.error('Fout bij het verzenden via Twilio:', err.message);
    res.status(500).json({ success: false, error: err.message }); // Verzend foutbericht
  }
});

// Server starten op poort 3000
app.listen(3000, () => {
  console.log('Server draait op http://localhost:3000');
});
