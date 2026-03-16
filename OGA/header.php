<?php global $wp_locale;
if (isset($wp_locale)) {
	$wp_locale->text_direction = 'ltr';
} ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset') ?>" />

<title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="preconnect" href="https://www.googletagmanager.com">

<link rel="stylesheet" href="<?php bloginfo('stylesheet_url') ?>" media="screen" />

<?php
remove_action('wp_head', 'wp_generator');
if (is_singular() && get_option('thread_comments')) {
	wp_enqueue_script('comment-reply');
}
wp_head();
?>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-S1YX4ETRJL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-S1YX4ETRJL');
</script>
</head>
<body <?php body_class(); ?>>

<div id="oga-main">
    <div id="oga-hmenu-bg" class="oga-bar oga-nav">
    </div>
    <div class="oga-sheet clearfix">

<?php if(theme_has_layout_part("header")) : ?>
<header class="oga-header<?php echo (theme_get_option('theme_header_clickable') ? ' clickable' : ''); ?>"><?php get_sidebar('header'); ?></header>
<?php endif; ?>

<div class="oga-layout-wrapper">
                <div class="oga-content-layout">
                    <div class="oga-content-layout-row">
                        <div class="oga-layout-cell oga-content">