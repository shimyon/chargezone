<?php
function routingMatch($url)
{
    // root url
    if ('/' == $url || '' == $url) {
        return array(
            'controller' => 'Default',
            'action' => 'index'
        );
    }

    // blog urls
    //   /blog
    //   /blog/show/{id}
    if ('/blog' == $url) {
        return array(
            'controller' => 'Blog',
            'action' => 'index'
        );
    } elseif (preg_match('#^/blog/show/(\\d+)$#', $url, $matches)) {
        return array(
            'controller' => 'Blog',
            'action' => 'show',
            'id' => $matches[1]
        );
    }

    // generic urls
    //   /{controllername}
    //   /{controllername}/{method}/{paramname}
    if (preg_match('#^/([^/]+)$#', $url, $matches)) {
        return array(
            'controller' => $matches[1],
            'action' => 'index'
        );
    } elseif (preg_match('#^/([^/]+)/([^/]+)/([^/]+)$#', $url, $matches)) {
        return array(
            'controller' => $matches[1],
            'action' => $matches[2],
            'param' => $matches[3]
        );
    }

    // if nothing else matches, then 404
    return array(
        'controller' => 'Error',
        'action' => 'error404'
    );
}


$mainurl = '/isquaretaxi';

$requestrul = $_SERVER['REQUEST_URI'];

// echo $requestrul;

$requestrul = str_replace($routingParameters, $mainurl, '');

$routingParameters = routingMatch($requestrul);


/* Requirements Files */
require './globals.php';

require './render.php';


/* Render files star */

$masterfilepath =  $GLOBALS['appdir'] . 'master.php';

$masterfile = render_php($masterfilepath);



/* Head Listing file */
$headlistphppath =  $GLOBALS['appdir'] . 'head_link_files.php';

$headlistphp = render_php($headlistphppath);


/* Head Listing file */
$footerlistphppath =  $GLOBALS['appdir'] . 'footer_link_files.php';

$footerlistphp = render_php($footerlistphppath);



/* Get Controller Details */
$body = $GLOBALS['appdir'] . $routingParameters['controller'] . DIRECTORY_SEPARATOR . $routingParameters['action'] . '.php';

//require $file;




/* Display Data Part */

/* Replace Your Tag Here */

/* Add Header Files */

$masterfile = str_replace('{{head_link_files}}', $headlistphp, $masterfile);

/* Add Footer Files */

$masterfile = str_replace('{{footer_link_files}}', $footerlistphp, $masterfile);



echo $masterfile;


?>