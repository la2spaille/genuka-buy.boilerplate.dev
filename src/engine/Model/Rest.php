<?php

namespace Engine\Model;

class Rest
{
    private $rooteUrl;

    public function __construct($rooteUrl)
    {
        $this->rooteUrl = $rooteUrl;
    }

    public function get($endpoint = "")
    {
        $url = $this->rooteUrl . "/" . $endpoint;
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl,  CURLOPT_TIMEOUT , 30);
        curl_setopt($curl,  CURLOPT_CUSTOMREQUEST , "GET");
        curl_setopt($curl, CURLOPT_CAINFO, ROOT . "engine/Model/cacert.pem");
        curl_setopt($curl, CURLOPT_HTTPHEADER , ["Content-Type: application/json"]);

        $response = curl_exec($curl);
        if (curl_error($curl)) {
            return (curl_error($curl)) ;
        }
        curl_close($curl);
        return json_decode($response,true);
    }
}
