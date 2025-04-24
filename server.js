const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Hier staat je HTML-bestand

// Boekingsdata opslaan of verwerken
app.post("/boek-rit", (req, res) => {
  const data = req.body;

  if (!data.ophaaladres || !data.afzetadres || !data.betaalmethode || !data.ritprijs) {
    return res.status(400).json({ error: "Onvolledige gegevens ontvangen." });
  }

  // Log naar console en optioneel opslaan in JSON bestand
  console.log("📥 Nieuwe boeking ontvangen:");
  console.log(data);

  const boeking = {
    tijd: new Date().toISOString(),
    ...data
  };

  const filePath = path.join(__dirname, "boekingen.json");
  let bestaandeBoekingen = [];

  if (fs.existsSync(filePath)) {
    bestaandeBoekingen = JSON.parse(fs.readFileSync(filePath));
  }

  bestaandeBoekingen.push(boeking);
  fs.writeFileSync(filePath, JSON.stringify(bestaandeBoekingen, null, 2));

  res.json({ message: "Boeking succesvol opgeslagen!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server gestart op http://localhost:${PORT}`);
});
