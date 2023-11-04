
<?php
        session_start();
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");

    
       require_once('../login/connexion.php');

                $sql = "SELECT * FROM  categorie ";
            
                $stmt = $pdo->prepare($sql);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
                echo json_encode($result);
                           

?>
            
       
       
        
       
            