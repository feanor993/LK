<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
$_POST["user_id"] = 2;
if ($_POST){
    require_once $_SERVER['DOCUMENT_ROOT'].'/app/settings/include.php';
    if ($_POST["user_id"] != null){


        $w = Webinar::getByIDWebinar($_POST["webinar_id"]);

        $result["id"] = 1;
        $result["background"] = "/img/vueImg/bg.jpg";
        $result["text"] = "Текст";
        $result["title"] = $w["ONLINE_ID"]["NAME"];
        $result["information"] = [
            "time" => "15 мин",
            "teacher" => "Иван Высоцкий",
            "title" => $w["NAME"]
        ];
        $result["mainButton"] = [
            "type" => "3",
            "link" => "https://school-olymp.ru/"
        ];



    }else{
        $result = "NO! error";
    }


//    echo "<pre>";
//    print_r($result);
//    echo "</pre>";
    echo json_encode($result);
}