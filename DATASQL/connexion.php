<?php

    $pdo = new PDO("mysql:hostname=localhost;dbname=test", 'root', '');
    if($pdo){
        echo("connected");
    }

    /*if(isset($_POST['connection'])){
        try{

            $pdo = new PDO("mysql:hostname=localhost;dbname=test", 'root', '');
            return $pdo;     

        }catch(PDOException $e){
            echo "erreur de connection"
        }
    }*/
          
    

?>