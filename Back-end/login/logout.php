
<?php
    session_start();    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


    $response = array();

    session_destroy();

    // Set response data
    $response['error'] = false;
    $response['message'] = 'Session has been destroyed successfully';

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);

        
?>
