<?php
$login = filter_var($_POST['name']);
$email = filter_var($_POST['email']);
$message =filter_var($_POST['message']);
$mysql = new mysqli('localhost', 'cw87889_users', 'root1', 'ccw87889_users');
$mysql->query("INSERT INTO `users7`( `name`, `email`,`message`) VALUES ('$login', '$email','$message')");
$mysql -> close();
header('LOCATION: Contact.html')
?>