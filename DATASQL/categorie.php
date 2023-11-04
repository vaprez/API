<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login page in with javascript</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/65ce4a017e.js" crossorigin="anonymous"></script>
   
</head>
<body>
    <!-- <> -->

    <?php
        if(isset($_POST['ajout'])){
            try{
                $designation=$_POST['designation'];

                $sql = "SELECT * FROM  categorie where (:designation ==$designation )";
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':designation', $designation);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if($result['designation'] == $designation){

                    echo "<script>alert('categorie deja existante')</script>";
                }

                else
                {
                        
                    $sql = "INSERT INTO categorie (designation) VALUES (:designation)";
                
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':designation', $designation);;
                    $stmt->execute();

                    echo "<script>alert('Vous avez bien été ajouté !')</script>";

                }              
                             
            }
            catch (PDOException $e)
            {
                echo 'Erreur connexion' . $e->getMessage();
            }
        }

        if(isset($_POST['modifier'])){
            try{
                $id = $_POST['id'];
                $designation=$_POST['designation'];
                $prix=$_POST['prix'];
                $categorie=$_POST['categorie'];

                $sql = "UPDATE  categorie set designation = :designation, prix = :prix, categorie = :categorie where id = :id" ;
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':prix', $prix);
                $stmt->bindParam(':designation', $designation);
                $stmt->bindParam(':categorie', $categorie);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                          
                             
            }
            catch (PDOException $e)
            {
                echo 'Erreur connexion' . $e->getMessage();
            }
        }

        if(isset($_POST['supprimer'])){
            try{
                $id = $_POST['id'];

                $sql = "DELETE from categorie  where id = :id" ;
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id', $id);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                          
                             
            }
            catch (PDOException $e)
            {
                echo 'Erreur connexion' . $e->getMessage();
            }
        }

        if(isset($_POST['afficher'])){
            try{
                $categorie = $_POST['categorie'];

                $sql = "SELECT * from categorie  where categorie = :categorie" ;
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':categorie', $categorie);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                          
                             
            }
            catch (PDOException $e)
            {
                echo 'Erreur connexion' . $e->getMessage();
            }
        }
        
    ?>

    <script>

        function ClearForm(){
            const form = document.getElementById('form')

            inputs = form.querySelectorAll('input')

            for (let input of inputs){
                input.value = '';
            }
        }

    </script>
    
</body>
</html>