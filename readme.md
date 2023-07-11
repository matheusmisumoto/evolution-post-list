# Evolution Posts List

This plugin for WordPress creates a Gutenberg block containing a template for a list of posts. Each item contains the post thumbnail, categories, title, excerpt and "read more". All of that information is wrapped inside a link to the post.

This is an alternative to the standard Posts List Template Block, where the categories are linked to the categories archive, and margins between title, excerpt and read more are not part of the link to the post.


## Installation

1. Upload the plugin files to the `/wp-content/plugins/evolution-post-list` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress.


## Block Attributes

- **ClassName (string):** CSS classes applied to the link.
- **ShowCategory (boolean):** Show post categories. Default: *true*.
- **ShowExcerpt (boolean):** Show post excerpt. Default: *false*.
- **ShowReadMore (boolean):** Show "read more" text. Default: *false*.


## HTML Output
```
<a href="[permalink]" title="[post title]">
    [thumbnail]
    <section class="wp-block-group">
    	[post categories]
        <h3>[post title]</h3>
        [excerpt]
        [read more]
    </section>
</a>
```
