<?php

namespace App\Model;
include_once ROOT . '/vendor/autoload.php';

use Prismic\Api;
use Prismic\LinkResolver;
use Prismic\Predicates;

class Prismic
{
    public static function test()
    {
        $url = "https://planete-green.prismic.io/api/v2";
        $token = "MC5ZMGRWbEJFQUFDRUFydmIx.IC_vv73vv71677-977-9F--_ve-_vRjvv73vv70h77-9XElZ77-9ZVDvv71J77-9Oe-_ve-_vRAl77-977-9Kw";
        $api = Api::get($url, $token);
        $response = $api->query('');
        echo '<pre>';
        var_dump($response);
        echo '</pre>';
    }
}
