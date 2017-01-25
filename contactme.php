<?php

$name = $_POST('name');
$email = $_POST('email'):
$message = $_POST('message'):

$to = "nat@natrivera.com";
$subject = "From Website";

mail ($to , $subject , $message , "From: " .  $name . $email);
echo "Your message has been sent.";


?>