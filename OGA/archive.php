<?php
/**
 *
 * archive.php
 *
 * The archive template. Used when a category, author, or date is queried.
 * Note that this template will be overridden by category.php, author.php, and date.php for their respective query types. 
 *
 * More detailed information about template’s hierarchy: http://codex.wordpress.org/Template_Hierarchy
 *
 */
get_header(); ?>
			<?php get_sidebar('top'); ?>
			<?php
			if (have_posts()) {
				global $posts;
				$post = $posts[0];
				theme_ob_start();

				if (is_category()) {
					echo '<h1>' . single_cat_title('', false) . '</h1>';
					echo category_description();
				} elseif (is_tag()) {
					echo '<h1>' . single_tag_title('', false) . '</h1>';
				} elseif (is_day()) {
					echo '<h1>' . sprintf(__('Daily Archives: <span>%s</span>', THEME_NS), get_the_date()) . '</h1>';
				} elseif (is_month()) {
					echo '<h1>' . sprintf(__('Monthly Archives: <span>%s</span>', THEME_NS), get_the_date('F Y')) . '</h1>';
				} elseif (is_year()) {
					echo '<h1>' . sprintf(__('Yearly Archives: <span>%s</span>', THEME_NS), get_the_date('Y')) . '</h1>';
				} elseif (is_author()) {
					the_post();
					echo theme_get_avatar(array('id' => get_the_author_meta('user_email')));
					echo '<h1>' . get_the_author() . '</h1>';
					$desc = get_the_author_meta('description');
					if ($desc) {
						echo '<div class="author-description">' . $desc . '</div>';
					}
					rewind_posts();
				} elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {
					echo '<h1>' . __('Blog Archives', THEME_NS) . '</h1>';
				}
				theme_post_wrapper(array('content' => theme_ob_get_clean(), 'class' => 'breadcrumbs'));

				/* Display navigation to next/previous pages when applicable */
				if (theme_get_option('theme_top_posts_navigation')) {
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
<?php get_footer();
