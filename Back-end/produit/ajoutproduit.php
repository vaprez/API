
<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        session_start();
        

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            require_once('../login/connexion.php');

            $designation = $data->designation;
            $prix = $data->prix;
            $categorie = $data->categorie;
            $date_in = $data->date_in;
            $date_up = $data->date_in;

            $sql= "SELECT * FROM prodruits WHERE designation = :designation";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':designation', $designation);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result != null)
            {
                $error = "produit deja existant";
                echo json_encode(['error' => true, 'success' => false, 'message' => $error]);
            }
            else
            {
                $sql = "INSERT INTO `prodruits`(designation,prix,categorie,date_in, date_up) VALUES (:designation, :prix , :categorie, :date_in, :date_up)";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':designation', $designation);
                $stmt->bindParam(':prix', $prix);
                $stmt->bindParam(':categorie', $categorie);
                $stmt->bindParam(':date_in', $date_in);
                $stmt->bindParam(':date_up', $date_up);

                $stmt->execute();
                
                echo json_encode(['error' => false, 'success' => true, 'message' => ' Vous avez bien été ajouté']);

                #header('location: Login.php');

            }              
                        
    }else {

        http_response_code(405); 
        echo json_encode(['error' => 'Method not allowed', 'success' => false]);
    }
?>
            
       
       
        
       
            