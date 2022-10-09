<?php

class Config
{
    //database config
    const HOST = "localhost";
    const USER = "root";
    const DATABASE = "loan";
    const PASSWORD = "Coder_1234";
    const PORT = "3306";

    //email config
    const MAIL_SENDER = "no-reply@mika.com";
    const MAIL_USERNAME = "no-reply@mika.com";
    const MAIL_PASSWORD = "VS2nnkTzugwsAJch";
    const RECIPIENTS = array(
        'festus.kerich@cellulant.io' => 'Kimtai Kerich',
    );


    //logs
    const INFO = "log/info.log";
    const ERROR = "log/error.log";

}
