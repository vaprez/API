   
    <?php
    require_once('connexion.php') ;

        if(isset($_POST['ajout'])){
            try{
                $designation=$_POST['designation'];
                $prix=$_POST['prix'];
                $categorie=$_POST['categorie'];

                $sql = "SELECT * FROM  prodruits where (:designation ==$designation, :prix ==$prix)";
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':prix', $prix);
                $stmt->bindParam(':designation', $designation);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if($result['designation'] == $designation){

                    echo "<script>alert('produit deja existant')</script>";
                }

                else
                {
                        
                    $sql = "INSERT INTO prodruits (designation,prix,categorie) VALUES (:designation, :prix, :categorie)";
                
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':prix', $prix);
                    $stmt->bindParam(':designation', $designation);
                    $stmt->bindParam(':categorie', $categorie);
                    $stmt->execute();

                    echo "<script>alert('Vous avez bien été ajouté !')</script>";

                    //header('location: Login.php');

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

                $pdo = new PDO("mysql:hostname=localhost;dbname=web", 'root', '');
                $sql = "UPDATE  prodruits set designation = :designation, prix = :prix, categorie = :categorie where id = :id" ;
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':prix', $prix);
                $stmt->bindParam(':designation', $designation);
                $stmt->bindParam(':categorie', $categorie);
                $stmt->execute();

                $result_mod = $stmt->fetch(PDO::FETCH_ASSOC);
                          
                             
            }
            catch (PDOException $e)
            {
                echo 'Erreur connexion' . $e->getMessage();
            }
        }

        if(isset($_POST['supprimer'])){
            try{
                $id = $_POST['id'];

                $pdo = new PDO("mysql:hostname=localhost;dbname=web", 'root', '');
                $sql = "DELETE from prodruits  where id = :id" ;
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id', $id);
                $stmt->execute();

                $result_del = $stmt->fetch(PDO::FETCH_ASSOC);
                          
                             
            }
            catch (PDOException $e)
            {
                echo 'Erreur connexion' . $e->getMessage();
            }
        }

        if(isset($_POST['afficher'])){
            try{
                $categorie = $_POST['categorie'];

                $pdo = new PDO("mysql:hostname=localhost;dbname=web", 'root', '');
                $sql = "SELECT * from prodruits  where categorie = :categorie" ;
               
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':categorie', $categorie);
                $stmt->execute();

                $result_sel = $stmt->fetch(PDO::FETCH_ASSOC);
                          
                return $result_sel ;
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
