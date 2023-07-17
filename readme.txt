=== Evolution Block List ===
Contributors:      Matheus Misumoto
Tags:              block
Tested up to:      6.1
Stable tag:        2.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

This plugin for WordPress creates a Gutenberg block containing a template for a list of posts. 

== Description ==

Each item contains the post thumbnail, categories, title, excerpt and "read more". All of that information is wrapped inside a link to the post.

This is an alternative to the standard Posts List Template Block, where the categories are linked to the categories archive, and margins between title, excerpt and read more are not part of the link to the post.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the `evolution-post-list.php` file and the `build` folder to the `/wp-content/plugins/evolution-post-list` directory.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= What about the src folder? =

The src folder contains the React-based source code for the block to work on Gutenberg editor.

To work on source code, run `npm install` on the folder. The source files should not be upload to the Wordpress installation.

== Changelog ==

= 2.0.0 =
* Add display options to sticky posts
* Bug fixes

= 1.0.0 =
* Initial Release