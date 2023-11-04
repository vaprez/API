
<?php
        
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        session_start();

        if (isset($_GET['designation'])) {
            $designation = $_GET['designation'];
            require_once('../login/connexion.php');
        
            $sql = "SELECT * FROM  categorie where designation_c = :designation ";
            
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':designation', $designation);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            
            
            if (!$result) {
                $error = "Query execution problem!";
                echo json_encode(['error' => true, 'success' => false, 'message' => $error]);
            } else {
                echo json_encode(['data' => $result]);
            }
        
        } else {
            $error = "designation  is missing.";
            echo json_encode(['error' => true, 'success' => false, 'message' => $error]);
        }

?>
       
        
       
            