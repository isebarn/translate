<template>
  <v-container>
    <v-list>
      <v-list-item-group
        v-model="article"
        return-object
        color="primary"
      >
        <v-list-item v-for="(article, i) in articles" :key="i" :value="article" @click="$router.push('article')">
          <v-card>
            <v-img v-if="article.picture" :src="article.picture" contain />
            <fun :word="article.title" />
          </v-card>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import fun from '~/components/fun'
export default {
  name: 'IndexPage',

  components: {
    fun
  },

  async fetch () {
    await this.getArticles()
  },

  computed: {
    ...mapFields(['articles', 'article'])
  },

  methods: {
    ...mapActions(['getArticles'])
  }

}
</script>

<style>
.v-card {
transition: opacity .2s ease-in-out;
}

.show-btns {
color: rgba(255, 255, 255, 1) !important;
}

</style>
