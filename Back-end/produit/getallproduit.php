
<?php
        session_start();
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");


            if (isset($_GET['categorie'])) {
                $categorie = $_GET['categorie'];
                require_once('../login/connexion.php');
            

                $sql = "SELECT * FROM `prodruits` join `categorie` on prodruits.categorie = categorie.id_categorie where prodruits.categorie = :categorie";
                
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':categorie', $categorie);
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
            
       
       
        
       
            