const endpoint = '/api/v1'

export default {
  initWikiCategories (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'wiki_categories?include[]=wiki_pages'
    })
  },
  changeWikiPageToCategoryReference (context, { page, category }) {
    context.dispatch('changeOneToManyReference', {
      child: page,
      parent: category,
      childRelationshipName: 'wiki-category',
      parentRelationshipName: 'wiki-pages'
    })
  }
}
