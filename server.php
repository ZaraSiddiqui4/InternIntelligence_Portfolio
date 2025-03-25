

<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "db_portfolio";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle Add Project Request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['project_name']) && isset($_POST['project_desc'])) {
        $name = $_POST['project_name'];
        $desc = $_POST['project_desc'];
        $sql = "INSERT INTO projects (name, description) VALUES ('$name', '$desc')";
        $conn->query($sql);
    } elseif (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
        $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";
        $conn->query($sql);
    }
}

// Handle Fetch Projects Request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['fetch_projects'])) {
        $sql = "SELECT * FROM projects";
        $result = $conn->query($sql);
        $projects = [];
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }
        echo json_encode($projects);
    }
}

// Handle Delete Project Request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_project'])) {
    $project_id = $_POST['delete_project'];
    $sql = "DELETE FROM projects WHERE id = $project_id";
    $conn->query($sql);
}

$conn->close();
?>
