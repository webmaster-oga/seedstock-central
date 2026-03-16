<?php theme_print_sidebar('header-widget-area'); ?>

<div class="oga-shapes">
<?php echo do_shortcode( "[stag_sidebar id='[top-ad-471-x-73']" ); ?>
</div>

<nav class="oga-nav">
    <div class="oga-nav-inner">
        <button class="oga-menu-btn" type="button" aria-expanded="false" aria-controls="oga-primary-menu">
            <span class="screen-reader-text"><?php esc_html_e('Toggle navigation', THEME_NS); ?></span>
            <span class="oga-menu-btn-line" aria-hidden="true"></span>
            <span class="oga-menu-btn-line" aria-hidden="true"></span>
            <span class="oga-menu-btn-line" aria-hidden="true"></span>
        </button>
    <?php
    wp_nav_menu(
        array(
            'theme_location' => 'primary-menu',
            'menu_id'        => 'oga-primary-menu',
            'menu_class'     => 'oga-hmenu',
            'container'      => false
        )
    );

    get_sidebar('nav');

?>
    </div>
</nav>

<div class="oga-mobile-ad-slot mobile-ad"><?php echo do_shortcode( "[stag_sidebar id='[top-ad-471-x-73']" ); ?></div>
