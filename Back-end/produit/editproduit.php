
<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        session_start();
        

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            require_once('../login/connexion.php');

            $id_prodruit = $data->id_prodruit;
            $designation = $data->designation;
            $prix = $data->prix;
            $date_up = $data->date_up;
            
                $sql = "UPDATE prodruits SET designation= :designation, prix = :prix, date_up = :date_up  where id_prodruit = :id_prodruit ";
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id_prodruit', $id_prodruit);
                $stmt->bindParam(':designation', $designation);
                $stmt->bindParam(':prix', $prix);
                $stmt->bindParam(':date_up', $date_up);
                $stmt->execute();
                echo json_encode(['error' => false, 'success' => true, 'message' => ' Modification effectuer avec succès']);
            }
            else {

                http_response_code(405); 
                echo json_encode(['error' => 'Method not allowed', 'success' => false]);
    }
?>
            
       
       
        
       
            
            
       
       
       
        
       
            