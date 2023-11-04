<?php

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $data = json_decode(file_get_contents("php://input"));
                require_once('connexion.php');

                $nom = $data->nom;
                $email = $data->email;
                $password = $data->password;

                $sql= "SELECT * FROM utilisateur WHERE email = :email";

                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
                if ($result != null)
                {
                    $error = "Email deja existant";
                    echo json_encode(['error' => true, 'success' => false, 'message' => $error]);
                }
                else
                {
                    $sql = "INSERT INTO `utilisateur`(nom, email, password) VALUES (:nom, :email, :password)";
                    $stmt = $pdo->prepare($sql);

                    $stmt->bindParam(':nom', $nom);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $password);

                    $stmt->execute();
                    
                    echo json_encode(['error' => false, 'success' => true, 'message' => ' Vous avez bien été ajouté']);

                    #header('location: Login.php');

                }              
                             
        }else {
   
            http_response_code(405); 
            echo json_encode(['error' => 'Method not allowed', 'success' => false]);
        }
        
    ?>