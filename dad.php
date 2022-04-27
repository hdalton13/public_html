<html>
<body>
<?php
if (isset($_GET['name'])) {
echo $_GET['name']." enjoy this joke!<br>";
}

$ch = curl_init('https://icanhazdadjoke.com/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$headers = array("Accept: text/plain");
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$joke = curl_exec($ch);
curl_close($ch);
echo $joke;

?>
</body>
</html>
