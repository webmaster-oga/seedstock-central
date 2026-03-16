<?php

global $theme_sidebars;

$places = array();

foreach ($theme_sidebars as $sidebar){

    if ($sidebar['group'] !== 'footer')

        continue;

    $widgets = theme_get_dynamic_sidebar_data($sidebar['id']);

    if (!is_array($widgets) || count($widgets) < 1)

        continue;

    $places[$sidebar['id']] = $widgets;

}

$place_count = count($places);

$needLayout = ($place_count > 1);

if (theme_get_option('theme_override_default_footer_content')) {

    if ($place_count > 0) {

        $centred_begin = '<div class="oga-center-wrapper"><div class="oga-center-inner">';

        $centred_end = '</div></div><div class="clearfix"> </div>';

        if ($needLayout) { ?>



<div class="oga-content-layout">

  <div class="oga-content-layout-row">

    <?php 

        }

        foreach ($places as $widgets) { 

            if ($needLayout) { ?>

    <div class="oga-layout-cell oga-layout-cell-size<?php echo $place_count; ?>">

      <?php 

            }

            $centred = false;

            foreach ($widgets as $widget) {

                 $is_simple = ('simple' == $widget['style']);

                 if ($is_simple) {

                     $widget['class'] = implode(' ', array_merge(explode(' ', theme_get_array_value($widget, 'class', '')), array('oga-footer-text')));

                 }

                 if (false === $centred && $is_simple) {

                     $centred = true;

                     echo $centred_begin;

                 }

                 if (true === $centred && !$is_simple) {

                     $centred = false;

                     echo $centred_end;

                 }

                 theme_print_widget($widget);

            } 

            if (true === $centred) {

                echo $centred_end;

            }

            if ($needLayout) {

           ?>

    </div>

    <?php 

            }

        } 

        if ($needLayout) { ?>

  </div>

</div>

<?php 

        }

    }

?>

<div class="oga-footer-text">

  <?php

global $theme_default_options;

echo do_shortcode(theme_get_option('theme_override_default_footer_content') ? theme_get_option('theme_footer_content') : theme_get_array_value($theme_default_options, 'theme_footer_content'));

} else { 

?>

  <div class="oga-footer-text">

    <div class="oga-content-layout">

      <div class="oga-content-layout-row">
        <div class="oga-layout-cell f0"> <img class="footerlogo" src="https://seedstockcentral.com.au/wp-content/uploads/2016/01/logo.png" /> </div>

        <div class="oga-layout-cell" style="width: 100%">

          <p><span style="font-size: 22px;">Keeping you up to date with the latest seedstock industry news</span></p>

          <p><span class="greyline"><br>

            </span></p>

        </div>

      </div>

    </div>

    <div class="oga-content-layout">

      <div class="oga-content-layout-row">

        <div class="oga-layout-cell f1"><a href="https://seedstockcentral.com.au/category/beef/" class="footer-title">Beef News</a><br />

          <a href="https://seedstockcentral.com.au/category/dairy/" class="footer-title">Sheep News</a><br />

          <a href="https://seedstockcentral.com.au/category/sheep/" class="footer-title">Dairy News</a><br />

          <a href="https://seedstockcentral.com.au/ssctv/" class="footer-title">SSC TV</a><br />

        </div>

        <div class="oga-layout-cell f2"><span class="social-title">Follow Us</span><br />

          <ul>

            <li><a href="http://www.facebook.com/seedstockcentral">Facebook</a></li>

            <li><a href="https://twitter.com/SeedStockCentra">Twitter</a></li>

            <li><a href="http://www.youtube.com/user/MoviesAtOGA">Youtube</a></li>

            <li><a href="https://seedstockcentral.com.au/feed/">RSS Feed</a></li>

          </ul>

          </p>

        </div>

        <div class="oga-layout-cell f3">

          <ul>

            <li><a href="https://seedstockcentral.com.au/advertise-with-us/">Advertise with us</a></li>

            <li><a href="https://seedstockcentral.com.au/terms-and-conditions/">Terms and conditions</a></li>

            <li><a href="https://seedstockcentral.com.au/company-details/">Company details</a></li>

            <li><a href="https://seedstockcentral.com.au/contact/">Contact us</a></li>

          </ul>

        </div>

        <!--<div class="oga-layout-cell f4"> <img class="footerlogo" src="https://seedstockcentral.com.au/wp-content/uploads/2016/01/logo.png" /> </div>-->

      </div>

    </div>

  </div>

  <?php } ?>

  <p class="oga-page-footer"> <span id="oga-footnote-links"><a href="https://ogacreative.com.au" target="_blank">OGA Creative Agency</a></span> </p>

</div>

