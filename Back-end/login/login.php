
<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('connexion.php');
    session_start();

    /*if ($_SESSION['connection']) {
        header('location: ../valider/login.html');
        exit();
    }*/

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->email) || empty($data->password)) {
            echo json_encode(['error' => 'Email or password is empty', 'success' => false]);
        }
        else{
            $email = $data->email;
            $password = $data->password;
            $sql = "SELECT * FROM utilisateur WHERE password = :password AND email = :email";
            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);

            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);


                if ($result == null)
                {
                    $error = "Email or Password is incorrect";
                    echo json_encode(['error' => true, 'success' => false, 'message' => $error]);
                }
                else
                {
                    $_SESSION['connection'] = true;
                    $_SESSION['user'] = $result['email'];
                    echo json_encode(['error' => false, 'success' => true, 'message' => 'Login successful']);
                    #header('location: ../valider/login.php');
            }
        } else {
            echo json_encode(['error' => 'Erreur lors de l\'exécution de la requête', 'success' => false]);
            exit();
        }
        }
        
    }else {
   
        http_response_code(405); 
        echo json_encode(['error' => 'Method not allowed', 'success' => false]);
    }


    /*if (isset($_POST['logout'])){
        unset($_SESSION['connection']);

        session_destroy();

        #header('location: ../Login.php');
    }*/
?>
