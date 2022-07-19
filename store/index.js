import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  translation: '',
  books: [],
  book: null,
  texts: [],
  page: 1,
  limit: 5,
  articles: [],
  article: [],
  articleText: []
})

export const mutations = {
  updateField,

  translation: (state, payload) => {
    state.translation = payload
  },

  books: (state, payload) => {
    state.books = payload
  },

  texts: (state, payload) => {
    state.texts = payload
  },

  articles: (state, payload) => {
    state.articles = payload
  },

  articleText: (state, payload) => {
    state.articleText = payload
  }
}

export const getters = {
  getField,

  translation (state) {
    return state.translation
  },

  books (state) {
    return state.books
  },

  texts (state) {
    return state.texts
  },

  articles (state) {
    return state.articles
  },

  articleText (state) {
    return state.articleText
  },

  pages (state) {
    if (state.book.length && state.limit) {
      return Math.floor(state.book.length / state.limit)
    } else {
      return 0
    }
  }
}

export const actions = {
  async setTranslation ({ commit }, word) {
    commit('translation', null)
    const res = await this.$axios
      .get('api/text?$queryset=word&word=' + word.replace(',', ''))
    commit('translation', res.data[0].translation)
  },

  async getBookList ({ commit }) {
    const res = await this.$axios
      .get('api/book')
    commit('books', res.data)
  },

  async getTexts ({ commit, state }) {
    const params = new URLSearchParams({
      book: state.book.id,
      $skip: state.page * state.limit,
      $limit: state.limit
    })
    const res = await this.$axios.get(`api/text?${params.toString()}`)
    commit('texts', res.data)
  },

  async getArticles ({ commit, state }) {
    const res = await this.$axios
      .get('diario_de_noticas/front_page')

    commit('articles', res.data)
  },

  async getArticle ({ commit, state }) {
    const res = await this.$axios
      .post('diario_de_noticas/article', { url: state.article.url })

    commit('articleText', res.data)
  }
}
