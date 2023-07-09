/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { TextControl } from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect, resolveSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, context } ) {
	const blockProps = useBlockProps();

	const post = useSelect( ( select ) => {

		const getPost = select( 'core' ).getEntityRecord( 'postType', 'post', context['postId'], { _embed: true });
		const isLoadingPost = select('core/data').isResolving('core', 'getEntityRecord', ['postType', 'post']);

		if(!isLoadingPost){
			const categoryArray = [];
			
			for(let i = 0; i < getPost.categories.length; i++){
				const getCategory = select( 'core' ).getEntityRecord( 'taxonomy', 'category', getPost.categories[i]);
				const isLoadingCategory = select('core/data').isResolving('core', 'getEntityRecord', ['taxonomy', 'category', getPost.categories[i]]);
				if (!isLoadingCategory){
					if (getCategory !== null && getCategory !== undefined) {
						categoryArray.push(getCategory);
					}
				}
			}
			
			const featuredImage = {};
			if(getPost && getPost._embedded && getPost._embedded['wp:featuredmedia']){
				featuredImage.url = getPost._embedded['wp:featuredmedia'][0].source_url;
			}
			
			return {
				title: getPost.title.raw,
				featuredImage: featuredImage.url,
				excerpt: getPost.excerpt.raw,
				categories: categoryArray
			};
		}
	}, []);

	if ( ! post ) {
		return null;
	}

	return (
		<div {...blockProps}>
			{ post.featuredImage ? <div><img src={post.featuredImage} /></div> : '' }
			<section>
				<header>{
					post.categories.map((category) => {
						if(category !== undefined){
							return category.name
						}					
					}).join(', ')	
				}</header>
				<h3>{ post.title }</h3>
				{ attributes['showExcerpt'] ? <p>{post.excerpt}</p> : '' }
				{ attributes['showReadMore'] ? <footer>Read more</footer> : '' }
			</section>
		</div>
	);
}
