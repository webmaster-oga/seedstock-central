<?php get_header(); ?>
<?php if (is_home() || is_front_page()): ?>
<h1 class="screen-reader-text"><?php echo esc_html(get_bloginfo('description')); ?></h1>
<?php endif; ?>
			<?php get_sidebar('top'); ?>
			<?php
			if (have_posts()) {
				/* Display navigation to next/previous pages when applicable */
				if (theme_get_option('theme_' . (theme_is_home() ? 'home_' : '') . 'top_posts_navigation')) {
					theme_page_navigation();
				}
				/* Start the Loop */
				while (have_posts()) {
					the_post();
					get_template_part('content', get_post_format());
				}
				/* Display navigation to next/previous pages when applicable */
				if (theme_get_option('theme_bottom_posts_navigation')) {
					theme_page_navigation();
				}
			} else {
				theme_404_content();
			}
			?>
			<?php get_sidebar('bottom'); ?>
<?php get_footer(); ?>