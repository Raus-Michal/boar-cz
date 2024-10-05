<!-- Spojení s databází -->
<?php
$host = 'localhost';
$db = 'tvoje_databaze';
$user = 'uzivatel';
$pass = 'heslo';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
