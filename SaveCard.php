<?php
require_once "lib/Config.php";

class SaveCard
{

    public function processCard()
    {


        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];
        $city = $_POST['city'];
        $zip = $_POST['zip'];
        $state = $_POST['state'];
        $cardname = $_POST['cardname'];
        $cardnumber = $_POST['cardnumber'];
        $expmonth = $_POST['expmonth'];
        $expyear = $_POST['expyear'];
        $cvv = $_POST['cvv'];
        $sameadr = $_POST['sameadr'];

        $mysqli = new mysqli(Config::HOST, Config::USER, Config::PASSWORD, Config::DATABASE, Config::PORT);

        if ($mysqli->connect_errno) {
            $this->flog(Config::ERROR, "Failed to connect to MySQL: " . $mysqli->connect_error);
            exit();
        }
        $result = $mysqli->query(
            "insert into card values('$firstname','$email','$phone ',
            '$address','$city',' $zip','$state','$cardname','$cardnumber',
            '$expmonth','$expyear',' $cvv','$sameadr')");
    
        if ($result) {
            $this->flog(Config::INFO, "0 results: ");
        } else {
            $this->flog(Config::ERROR, "Error occured ********* ". $mysqli->error);
            echo '<script>alert("Error occured")</script>';
            $this->redirect('payment.html');
        }
        $mysqli->close();
        return 'heelo';
    }

    /* function flog
     * write data to a log file
     * @param $file
     * @param $string
     * */
    public function flog($file, $string)
    {
        $date = date("Y-m-d H:i:s");
        $fo = fopen($file, 'ab');
        fwrite($fo, $date . " | " . $_SERVER['PHP_SELF'] . " | " . str_replace("\n", " ", $string) . "\n");
        fclose($fo);
    }
    /**
     * The fuction redirect a page to another page.
     * @param url
     * @return page
     */
    function redirect($url) {
        header('Location: '.$url);
        die();
    }
}
$save=new SaveCard();
$save->processCard();