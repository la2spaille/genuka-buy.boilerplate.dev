<?php


define('VERSION', 15);

$root = substr($_SERVER['DOCUMENT_ROOT'], 0, -6);

require $root . 'app/Core/Constant.php';
\App\Core\Constant::init();

require ROOT . 'app/Core/App.php';
\App\Core\App::init();
