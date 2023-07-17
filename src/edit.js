/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { PanelBody, ToggleControl, Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';

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

export default function Edit( { 
	attributes: {
		className,
		showCategory,
		showExcerpt,
		showReadMore,
		showCategoryOnSticky,
		showExcerptOnSticky,
		showReadMoreOnSticky
	}, 
	setAttributes,
	context: {
		postType,
		postId,
		queryId
	}
} ) {
	const blockProps = useBlockProps();

	const [ rawTitle = '' ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);

	const [ rawExcerpt ] = useEntityProp( 'postType', postType, 'excerpt', postId );
	const [ categories ] = useEntityProp( 'postType', postType, 'categories', postId );
	const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId);

	const toggleAttribute = ( attributeName ) => ( newValue ) =>
	setAttributes( { [ attributeName ]: newValue } );

	const placeholder = ( content ) => {
		return (
			<Placeholder
				className={ 'block-editor-media-placeholder' }
				withIllustration={ true }
			>
				{ content }
			</Placeholder>
		);
	};
	
	let postTitle = <h3>{ __( 'Title' ) }</h3>;
	let postExcerpt = '';
	let postImage;
	let postCategories = <header>{ __('Categories') }</header>;

	if ( postType && postId ) {
		postTitle = <h3 dangerouslySetInnerHTML={ { __html: rawTitle } } />

		postExcerpt = <p dangerouslySetInnerHTML={
			{
				__html: rawExcerpt
			}
		}
		/>

		const getCategories = useSelect( ( select ) => {
			const categoryArray = [];
			
			for(let i = 0; i < categories.length; i++){
				const getCategory = select( 'core' ).getEntityRecord( 'taxonomy', 'category', categories[i]);
				const isLoadingCategory = select('core/data').isResolving('core', 'getEntityRecord', ['taxonomy', 'category', categories[i]]);
				if (!isLoadingCategory){
					if (getCategory !== null && getCategory !== undefined) {
						categoryArray.push(getCategory);
					}
				}
			}
			
			return {
				names: categoryArray
			};
		}, [postId]);

		// Process featured image only if its ID cames from entityProp
		// to avoid unnecessary API calls
		if (featuredImage > 0) {
			const image = useSelect( ( select ) => {
				const getPost = select( 'core' ).getEntityRecord( 'postType', 'post', postId, { _embed: true });
				const isLoadingPost = select('core/data').isResolving('core', 'getEntityRecord', ['postType', 'post']);
				
				if(!isLoadingPost){
					const featuredImage = {};

					if(getPost && getPost._embedded && getPost._embedded['wp:featuredmedia']){
						featuredImage.url = getPost._embedded['wp:featuredmedia'][0].source_url;
					}

					return {
						featuredImage: featuredImage.url,
					};
				}
				}, [postId]);
				

				postCategories = <header>{
					getCategories.names.length == categories.length ?
					getCategories.names.map((category) => {
						if(category !== undefined){
							return category.name
						}
					}).join(', ')
					:
					<Spinner />
				}</header>

				postImage = (image.featuredImage == undefined) ? <div><Spinner /></div> : <div><img src={ image.featuredImage } /></div>
			}
		}

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show Categories' ) }
						checked={ showCategory }
						onChange={ toggleAttribute( 'showCategory' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show excerpt' ) }
						checked={ showExcerpt }
						onChange={ toggleAttribute( 'showExcerpt' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show "Read More" text' ) }
						checked={ showReadMore }
						onChange={ toggleAttribute( 'showReadMore' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Sticky Post Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show Categories' ) }
						checked={ showCategoryOnSticky }
						onChange={ toggleAttribute( 'showCategoryOnSticky' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show Excerpt' ) }
						checked={ showExcerptOnSticky }
						onChange={ toggleAttribute( 'showExcerptOnSticky' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show "Read More" text' ) }
						checked={ showReadMoreOnSticky }
						onChange={ toggleAttribute( 'showReadMoreOnSticky' ) }
					/>
				</PanelBody>
			</InspectorControls>
			{ postImage }
			<section>
				{ showCategory && postCategories }
				{ postTitle }
				{ showExcerpt && postExcerpt }
				{ showReadMore && <footer>{ __('Read more') }</footer> }
			</section>
		</div>
	);
}
