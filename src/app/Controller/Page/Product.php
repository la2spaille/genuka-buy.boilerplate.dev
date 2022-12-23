<?php

namespace App\Controller\Page;

use App\Model\Genuka;
use \Engine\Controller\Controller;

class Product extends Controller
{


    public function show($product)
    {


        /*------------------------------------
            DATA
        ------------------------------------*/
        $data = Genuka::get_product($product);
        if (empty($data)) {
            $this->head['title'] = 'Error — 404 Not Found';
            return $this->renderError();

        }

        $this->data->id = $data['id'];
        $this->data->name = $data['name'];
        $this->data->description = $data['description'];
        $this->data->price = $data['price'];
        $this->data->company_id = $data['company_id'];
        $this->data->medias = $data['medias'];
        $this->data->variants = $data['variants'];
        $this->data->reviews = $data['reviews'];
        $this->data->avg_reviews = $data['avg_reviews'];
        $this->data->total_reviews = $data['total_reviews'];
        $this->data->url = $product;

        $data = Genuka::get_company_details($this->data->company_id);
        $this->data->company_name = $data['name'];
        $this->data->logo = $data['logo'];
        $this->data->currency = $data['currency'];
        $this->data->payment_modes = $data['payment_modes'];
        $this->data->whole = $data;

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = $this->data->name;
        $this->head['description'] = "";
        $this->head['opengraph'] = $this->data->medias[0]['link'];
        $this->head['logo'] = $this->data->logo;
        $this->head['color'] = '#000';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        return $this->render('product_slug');
    }

}
