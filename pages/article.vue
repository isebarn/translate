<template>
  <v-container>
    <v-list>
      <v-banner
        v-if="$device.isMobileOrTablet"
        outlined
        rounded
        single-line
        sticky
      >
        {{ translation }}
      </v-banner>
      <template v-for="(text, i) in articleText">
        <v-list-item-content :key="i">
          <v-list-item-title class="text-wrap">
            <fun v-for="(word, j) in text.untranslated.split(' ')" :key="j" :word="word" />
          </v-list-item-title>
          <v-hover v-slot="{ hover }">
            <v-card
              flat
              :class="{ 'on-hover': hover }"
            >
              <v-list-item-title class="green--text text-wrap" style="font-family:'Droid Sans';">
                {{ text.translation }}
              </v-list-item-title>
            </v-card>
          </v-hover>
        </v-list-item-content>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import fun from '~/components/fun'
export default {
  name: 'ArticlePage',

  components: {
    fun
  },

  mounted () {
    this.getArticle()
  },

  computed: {
    ...mapFields(['articleText', 'translation'])
  },

  methods: {
    ...mapActions(['getArticle'])
  }

}
</script>

<style>
.v-card {
transition: opacity .2s ease-in-out;
}

.v-card:not(.on-hover) {
opacity: 0.3;
 }

.show-btns {
color: rgba(255, 255, 255, 1) !important;
}

</style>
