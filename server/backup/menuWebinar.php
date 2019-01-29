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
//$_POST["user_id"] = 2;
if ($_POST){
    require_once $_SERVER['DOCUMENT_ROOT'].'/app/settings/include.php';


        $list["CURRENT"] = Webinar::getByIDWebinar($_POST["webinar_id"]);
        $list["MENU"] = Webinar::getList($list["CURRENT"]["ONLINE_ID"]["ID"]);


        $result["lessonInformation"] = [
            "type" => "Вебинарный курс",
            "name" => $list["CURRENT"]["ONLINE_ID"]["NAME"],
            "group" => ($list["CURRENT"]["GROUP_ID"] == 0 ? "false" : "true")
        ];
        $result["counter"] = [
            "total" => count($list["MENU"]),
            "now" => 0
        ];


        foreach ($list["MENU"] as $key=>$menu){
            $date = new DateTime($menu["DATE"]);
            $date_try = $date->format('d.m.Y H:i');
            if ($menu["GROUP_ID"] == 0){
                $result["navigation"][] = [
                    "id" => $menu["ID"],
                    "name" => $menu["NAME"],
                    "date" => $date_try,
                    "access" => "open",
                    "point" => 0,
                    "time" => 0,
                    "path" => $menu["CODE"]
                ];
            }else{
                if(!isset($group[$menu["GROUP_ID"]])){
                    $group[$menu["GROUP_ID"]] = Webinar::getByIDGroup($menu["GROUP_ID"]);
                    $result["navigation"][$menu["GROUP_ID"]]["name"] = $group[$menu["GROUP_ID"]]["NAME"];
                    $result["navigation"][$menu["GROUP_ID"]]["time"] = "10 минут";
                }

                $result["navigation"][$menu["GROUP_ID"]]["lessons"][] = [
                    "id" => $menu["ID"],
                    "name" => $menu["NAME"],
                    "date" => $date_try,
                    "access" => "open",
                    "point" => 0,
                    "time" => 0,
                    "path" => $menu["CODE"]
                ];
            }
        }



//    echo "<pre>";
//    print_r($result);
//    echo "</pre>";
    echo json_encode($result);
}
