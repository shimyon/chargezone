<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$id = strval($_POST['id']);
$path = 'booking' . DIRECTORY_SEPARATOR . 'cancellation';
$content = $_POST['content'];

if (!file_exists($path)) {
    mkdir($path);
    //chmod($id, 0755);
}

$target_file = $path . DIRECTORY_SEPARATOR . $id . ".html";

echo $target_file;

$file = fopen($target_file, "w");

fwrite($file, $content);

fclose($file);

?>