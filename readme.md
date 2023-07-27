# Evolution Posts List

This plugin for WordPress creates a Gutenberg block containing a template for a list of posts. Each item contains the post thumbnail, categories, title, excerpt and "read more". All of that information is wrapped inside a link to the post.

This is an alternative to the standard Posts List Template Block, where the categories are linked to the categories archive, and margins between title, excerpt and "read more" are not part of the link to the post.

See it in action: https://matheusmisumoto.dev/blog/

## Installation

1. Upload the `evolution-post-list.php` file and the `build` folder to the `/wp-content/plugins/evolution-post-list` directory.

2. Activate the plugin through the 'Plugins' screen in WordPress.


## Block Attributes

- **ClassName (string):** CSS classes applied to the link.
- **ShowCategory (boolean):** Show post categories. Default: *true*.
- **ShowExcerpt (boolean):** Show post excerpt. Default: *false*.
- **ShowReadMore (boolean):** Show "read more" text. Default: *false*.
- **ShowCategoryOnSticky (boolean):** Show post categories. Default: *true*.
- **ShowExcerptOnSticky (boolean):** Show post excerpt. Default: *true*.
- **ShowReadMoreOnSticky (boolean):** Show "read more" text. Default: *true*.


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

## Editing the source code

The output to the website is processed on `evolution-post-list.php` file.

The block preview on Gutenberg visual editor is a React script, which source is located on `/src` folder. To work on it, install the dependencies using `npm install` on the root folder.

---
Developed with ☕ by [Matheus Misumoto](https://matheusmisumoto.dev) in Santos, Brazil