
<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        session_start();
        

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            require_once('../login/connexion.php');

            $id_categorie = $data->id_categorie;

                $sql = " DELETE FROM categorie where id_categorie = :id_categorie ";
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id_categorie', $id_categorie);

                $stmt->execute();
                echo json_encode(['error' => false, 'success' => true, 'message' => ' Modification effectuer avec succès']);
            }
            else {

                http_response_code(405); 
                echo json_encode(['error' => 'Method not allowed', 'success' => false]);
    }
?>
            
       
       
        
       
            
            
       
       
       
        
       
            