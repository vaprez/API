<?php
    session_start();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



    $response = array();

    if (isset($_SESSION['user'])) {
        $response['loggedIn'] = true;
        $response['message'] = 'User is logged in';
    } else {
        $response['loggedIn'] = false;
        $response['message'] = 'User is not logged in';
    }

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();

?>