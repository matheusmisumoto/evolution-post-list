<?php
/**
 * Plugin Name:       Evolution Post List
 * Description:       A Gutenberg block containing a template for a list of posts. 
 * Version:           2.1
 * Requires at least: 6.1
 * Requires PHP:      8.0
 * Author:            Matheus Misumoto
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       evolution
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function evolution_categories($post_ID) {
	$categories = array();
	if(get_post_type($post_ID) == 'post') {
		foreach (get_the_category($post_ID) as $c) {
			$category = get_category($c);
			array_push($categories, $category->name);
		}
	} else {

		$anc = get_post_ancestors($post_ID);

		$anc = array_reverse($anc);

		foreach ( $anc as $ancestor ) {
			array_push($categories, get_the_title($ancestor));
		}
	}
	if (sizeOf($categories) > 0) {
		$post_categories = implode(', ', $categories);
	} else {
		$post_categories = '';
	}
	return $post_categories;
}


function render_block_evolution_post_list( $attributes, $content, $block ) {
    
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$post_ID = $block->context['postId'];

	$link = get_the_permalink( $post_ID );
	$title = get_the_title();
	$categories = $excerpt = $readMore = $thumb = "";
	$class = " class=\"wp-block-group\"";


	if ( ! $title ) {
		return '';
	}

	if ( isset( $attributes['className']) ) {
		$class = ' class="'.$attributes['className'].'"';
	}

	if ( 
		( ( !is_sticky($post_ID) || ( is_sticky($post_ID) && ( is_archive() || is_paged() ) ) ) && ( isset( $attributes['showCategory'] ) && $attributes['showCategory'] ) ) 
		|| ( is_sticky($post_ID) && is_home() && !is_paged() && ( isset( $attributes['showCategoryOnSticky'] ) && $attributes['showCategoryOnSticky'] ) )
	) {
		$post_terms = evolution_categories($post_ID);
		$categories = '<header class="wp-block-post-terms">'.$post_terms.'</header>';
	}

	if ( 
		( ( !is_sticky($post_ID) || ( is_sticky($post_ID) && ( is_archive() || is_paged() ) ) ) && ( isset( $attributes['showExcerpt'] ) && $attributes['showExcerpt'] ) )
		|| ( is_sticky($post_ID) && is_home() && !is_paged() && ( isset( $attributes['showExcerptOnSticky'] ) && $attributes['showExcerptOnSticky'] ) )
	) {
		if ( strlen( get_the_excerpt( $post_ID ) ) ){
			$excerpt = '<p>'.get_the_excerpt( $post_ID ).'</p>';
		}
	}

	if ( 
		( ( !is_sticky($post_ID) || ( is_sticky($post_ID) && ( is_archive() || is_paged() ) ) ) && ( isset( $attributes['showReadMore'] ) && $attributes['showReadMore'] ) )
		|| ( is_sticky($post_ID) && is_home()  && !is_paged() && ( isset( $attributes['showReadMoreOnSticky'] ) && $attributes['showReadMoreOnSticky'] ) )
	) {
		if ( strlen( get_the_excerpt( $post_ID ) ) ){
			$readMore = '<footer class="wp-block-group">'.__( 'Read more', 'evolution' ).'</footer>';
		}
	}

	if ( has_post_thumbnail( $post_ID ) ) {
		if( is_sticky($post_ID) ){
			$size = 'destaque';
		} else {
			$size = 'thumbnail';
		}
		$thumb = '<div>'.get_the_post_thumbnail( $post_ID, $size ).'</div>';
	}

	if ( get_post_format( $post_ID ) == 'link' ) {
		$link = get_the_excerpt( $post_ID );
		// $link = preg_replace("^https?:\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$", get_the_content( $post_ID ));
	}

	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'teste' ) );

    return sprintf('<a href="%2$s" title="%5$s">
		%3$s
        <section class="wp-block-group">
            %4$s
            <h3>%5$s</h3>
            %6$s
            %7$s
		</section></a>',
			$wrapper_attributes,
			$link,
			$thumb,
			$categories,
            $title,
			$excerpt,
            $readMore
        );
		
}

/**
 * Registers the `evolution/post-list` block on the server.
 */
function register_block_evolution_post_list() {
	
	$a = register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'render_block_evolution_post_list',
		)
	);
	
}
add_action( 'init', 'register_block_evolution_post_list' );