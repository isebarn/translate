<template>
  <v-container>
    <v-list>
      <v-list-item-group
        v-model="book"
        return-object
        color="primary"
      >
        <v-list-item v-for="book in books" :key="book.id" :value="book" @click="$router.push('book')">
          {{ book.name }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  name: 'BookPage',

  async fetch () {
    await this.getBookList()
  },

  computed: {
    ...mapGetters(['books']),
    ...mapFields(['book'])
  },

  methods: {
    ...mapActions(['getBookList']),

    openBook (book) {
      console.log(book)
    }
  }
}
</script>
