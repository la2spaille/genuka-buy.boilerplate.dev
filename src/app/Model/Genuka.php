<?php

namespace App\Model;

use Engine\Model\Rest;

 class Genuka
{
    private static $api;

    public function __construct()
    {
        self::$api = new Rest("https://dashboard.genuka.com/api/2021-10");

    }

    public static function get_product($product)
    {
        (new Genuka)->__construct();
        $code = self::$api->get("products/code/$product");
        $slug = self::$api->get("products/slug/$product");
        $data = empty($slug) ? $code : $slug;
        return $data;
    }

    public static  function get_company_details($id) {
        (new Genuka)->__construct();
        return self::$api->get("companies/details/$id");
    }


}