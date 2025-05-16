const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const puerto = 3000;

// Configurar conexión a MySQL
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "personas",
  port: 3308
});

conexion.connect(error => {
  if (error) throw error;
  console.log("Conectado a la base de datos.");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/obtener_personas", (req, res) => {
  conexion.query("SELECT * FROM personas", (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
});

app.post("/guardar_persona", (req, res) => {
  const persona = req.body;
  conexion.query("INSERT INTO personas SET ?", persona, (error, result) => {
    if (error) return res.status(500).json({ error });
    res.send(result.insertId.toString());
  });
});

app.post("/actualizar_persona", (req, res) => {
  const { id, nombre, edad, ocupacion, genero } = req.body;
  conexion.query(
    "UPDATE personas SET nombre=?, edad=?, ocupacion=?, genero=? WHERE id=?",
    [nombre, edad, ocupacion, genero, id],
    (error, result) => {
      if (error) return res.status(500).json({ error });
      res.send("Actualizado");
    }
  );
});

app.post("/eliminar_persona", (req, res) => {
  const { id } = req.body;
  conexion.query("DELETE FROM personas WHERE id=?", [id], (error, result) => {
    if (error) return res.status(500).json({ error });
    res.send("Eliminado");
  });
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});