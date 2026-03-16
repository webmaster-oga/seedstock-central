<?php theme_print_sidebar('header-widget-area'); ?>

<div class="mobile"><a href="<?php echo esc_url(home_url('/')); ?>"><img class="moblogo" src="https://seedstockcentral.com.au/wp-content/themes/OGA/images/moblogo.jpg" alt="<?php bloginfo('name'); ?>"/></a></div>

    <div class="oga-shapes">
<?php echo do_shortcode( "[stag_sidebar id='[top-ad-471-x-73']" ); ?>
            </div>




<nav class="oga-nav">
    <div class="oga-nav-inner">
    <?php
	wp_nav_menu(
		array(
			'theme_location' => 'primary-menu',
			'menu_class'     => 'oga-hmenu',
			'container'      => 'ul'
		)
	);

	get_sidebar('nav'); 

?> 
        </div>
    </nav>

                    
