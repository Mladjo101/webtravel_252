const express = require('express');
const mongoose = require('mongoose');
const korisnikRoutes = require('./routes/KorisnikRoutes');
const putovanjeRoutes = require('./routes/PutovanjeRoutes');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Korisnik = require('./models/Korisnik');



mongoose.connect('mongodb+srv://mladjo:Kamberovic899@dbtravel-252.15bdh6q.mongodb.net/dbtravel_252?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to database')
    dodajAdmin();
});

async function dodajAdmin() {
  try {
    const adminUser = await Korisnik.findOne({ email: "mladjo@example.com" });
    if (!adminUser) {
      const newAdmin = new Korisnik({
        korisnickoIme: "mladjoAdmin",
        lozinka: "adminpass", 
        email: "mladjo@example.com",
        uloga: "admin",
        aktivan: true
      });
      await newAdmin.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error ensuring admin user:", error);
  }
}


const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/korisnici', korisnikRoutes);
app.use('/api/putovanja', putovanjeRoutes);



app.get('/', (req, res) => {
  res.send('Travel Agency Portal');
});





app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
