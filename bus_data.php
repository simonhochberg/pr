<?php
//$servername = "localhost";
$username = "simonhochberg";
$servername = "mysql";
$password = "fkmCA67yAzN3asqFq99enzi5";
$dbname = "simonhochberg";

//$longitude = $_GET["lon"];
//$latitude = $_GET["lat"];
//$agency = $_GET["agency"];

$x_max = $_GET["xMax"];
$x_min = $_GET["xMin"];
$y_max = $_GET["yMax"];
$y_min = $_GET["yMin"];

$am_peak = $_GET["am_peak"];
$pm_peak = $_GET["pm_peak"];
$wkdy = $_GET["wkdy"];
$sat = $_GET["sat"];
$sun = $_GET["sun"];

/*$mysqli = new mysqli($servername, $username, $password, $dbname);
if (mysqli_connect_errno($mysqli)) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}*/

//$result = $mysqli->query("SELECT * FROM AllRail");

try {
    
    $conn = new PDO("mysql:host=$servername:3306;dbname=$dbname", $username, $password);
    
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT * FROM AllBus WHERE stop_lon BETWEEN '$x_min' AND '$x_max' AND stop_lat BETWEEN '$y_min' AND '$y_max' AND am_pk <= '$am_peak' AND pm_pk <= '$pm_peak' AND wkdy <= '$wkdy' AND sat <= '$sat' AND sun <= '$sun'");
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->FetchAll(PDO::FETCH_ASSOC);
    $json=json_encode($result);

    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
echo $json;
?>