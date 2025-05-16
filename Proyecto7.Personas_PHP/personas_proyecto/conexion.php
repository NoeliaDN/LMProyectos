<?php
$host = "localhost";
$usuario = "root";
$contrasena = "admin";
$baseDatos = "personas";
$puerto = 3308;  

$conn = new mysqli($host, $usuario, $contrasena, $baseDatos, $puerto);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>