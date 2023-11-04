
<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        session_start();
        

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            require_once('../login/connexion.php');

            $id_prodruit = $data->id_prodruit;

                $sql = " DELETE FROM prodruits where id_prodruit = :id_prodruit ";
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id_prodruit', $id_prodruit);

                $stmt->execute();
                echo json_encode(['error' => false, 'success' => true, 'message' => ' Modification effectuer avec succès']);
            }
            else {

                http_response_code(405); 
                echo json_encode(['error' => 'Method not allowed', 'success' => false]);
    }
?>
            
       
       
        
       
            
            
       
       
       
        
       
            