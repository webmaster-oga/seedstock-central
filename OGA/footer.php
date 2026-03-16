                        </div>
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            </div>
    </div>
    
    
    
    <div class="base-ad"><?php echo do_shortcode( "[stag_sidebar id='base-ad-1000-x-98']" ); ?></div>
<!--<div class="ssctvwrapper"><div class="ssctv"><h2>SSC TV</h2><a href="https://seedstockcentral.com.au/ssctv/" class="more-text">More Videos</a><?php // echo do_shortcode( "[everslider id='ssc_tv']" ); ?></div></div>-->
<?php if(is_home() || is_front_page()){ ?>  
<div class="beef"><h2>Beef News</h2><a href="https://seedstockcentral.com.au/category/beef/" class="more-text">More Stories</a><?php echo do_shortcode( "[everslider id='beef']" ); ?></div>
<div class="sheep"><h2>Sheep News</h2><a href="https://seedstockcentral.com.au/category/sheep/" class="more-text">More Stories</a><?php echo do_shortcode( "[everslider id='sheep']" ); ?></div>
<div class="dairy"><h2>Dairy News</h2><a href="https://seedstockcentral.com.au/category/dairy/" class="more-text">More Stories</a><?php echo do_shortcode( "[everslider id='dairy']" ); ?></div>
    <div class="footer-ad"><?php echo do_shortcode( "[stag_sidebar id='footer-ad-1000-x-98']" ); ?></div>
  <?php } ?>
<div class="mobile-ad"><?php echo do_shortcode( "[stag_sidebar id='[top-ad-471-x-73']" ); ?></div>
<div class="clear"></div>
<footer class="oga-footer">
  <div class="oga-footer-inner"><?php get_sidebar('footer'); ?></div>
</footer>

</div>




<div id="wp-footer">

	<?php wp_footer(); ?>

	<!-- <?php printf(__('%d queries. %s seconds.', THEME_NS), get_num_queries(), timer_stop(0, 3)); ?> -->

</div>

</body>

</html>



