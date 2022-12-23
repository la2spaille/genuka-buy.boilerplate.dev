<?php

namespace Engine\Controller;

use \stdClass;
use \App\Config\Head;

class Controller
{
    protected $head;
    protected $data;
    private $device;
    private $callArgs;
    private $content;

    public function __construct($callArgs = '')
    {
        $this->callArgs = $callArgs;
        $this->data = new stdClass;
    }


    public function render($viewName)
    {
        // Device
        $this->gDevice();

        // Head
        $this->head += Head::data();

        // Head url
        $urlPath = $_SERVER['REQUEST_URI'] === '/' ? '' : $_SERVER['REQUEST_URI'];
        $this->head['url'] = $this->head['urlBase'] . $urlPath;

        // Head robots
        if ($_SERVER['SERVER_NAME'] === $this->head['serverName'] && $this->head['allow-robots']) {
            $this->head['robots'] = 'all';
        } else {
            $this->head['robots'] = 'noindex, nofollow';
        }

        // Content
        $this->content = $this->get_content(ROOT . 'app/View/page/' . $viewName . '.php');
        if (isset($_GET['xhr'])) {
            $xhr['title'] = $this->head['title'];
            $xhr['html'] = $this->content;
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                return ($xhr);
            } else {
                header("Content-Type: application/json");
                print json_encode(array('xhr' => $xhr));
            }
        } else {
            echo $this->get_content(ROOT . 'app/View/base/boilerplate.php');
        }
    }

    private function gDevice()
    {
        $isM = $this->isMobile();
        $this->isM = json_encode($isM);
        $this->isD = json_encode(!$isM);
        $this->device = $isM ? 'm' : 'd';
    }

    private function isMobile()
    {
        if (empty($_SERVER['HTTP_USER_AGENT'])) {
            $is_mobile = false;
        } else if (strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false
            || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false
            || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false
            || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false
            || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false
            || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false
            || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false) {
            $is_mobile = true;
        } else {
            $is_mobile = false;
        }

        return $is_mobile;
    }

    private function get_content($url): string
    {
        ob_start();
        require $url;
        return ob_get_clean();
    }

    public function renderError()
    {
        header('HTTP/1.1 404 Not Found', 404, TRUE);

        // Device
        $this->gDevice();

        echo $this->get_content(ROOT . 'app/View/base/p404.php');
    }
}
