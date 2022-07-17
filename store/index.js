import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  translation: '',
  books: [],
  book: null,
  texts: [],
  page: 1,
  limit: 5
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
  }
}
