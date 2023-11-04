<!DOCTYPE html>
<html>
    <body>
        <form method="post" action="">
            Name: <input type="text" name="fname">
            <input type="submit">
        </form>

        <?php
            if (isset ($_POST['fname'])) {
                // collect value of input field
                $name = $_POST['fname'];
                if (empty($name)) {
                    echo "Name is empty";
                } else {
                    echo $name  ;
                    var_dump($name);
                }
            }
        ?>
    </body>
</html>
