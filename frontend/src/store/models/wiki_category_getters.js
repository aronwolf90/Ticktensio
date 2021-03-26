import { Utils } from 'vuex-jsonapi-client'

export default {
  wikiCategories (state, getters) {
    return getters.collection('wiki-categories') || []
  },
  rootWikiCategories (state, getters) {
    return getters.wikiCategories.filter(category => {
      return Utils.attribute(category, 'root')
    })
  }
}
