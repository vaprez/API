
    <?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        session_start();
        

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            require_once('../login/connexion.php');

            $designation = $data->designation;

            $sql= "SELECT * FROM categorie WHERE designation_c = :designation";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':designation', $designation);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result != null)
            {
                $error = "categorie deja existante";
                echo json_encode(['error' => true, 'success' => false, 'message' => $error]);
            }
            else
            {
                $sql = "INSERT INTO `categorie`(designation) VALUES (:designation)";
                $stmt = $pdo->prepare($sql);

                $stmt->bindParam(':designation', $designation);

                $stmt->execute();
                
                echo json_encode(['error' => false, 'success' => true, 'message' => ' Vous avez bien été ajouté']);

                #header('location: Login.php');

            }              
                        
    }else {

        http_response_code(405); 
        echo json_encode(['error' => 'Method not allowed', 'success' => false]);
    }
?>
            
       
       
        
       
            