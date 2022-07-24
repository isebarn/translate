<template>
  <v-carousel hide-delimiters>
    <v-carousel-item v-for="(group, j) in articleText" :key="j">
      <v-row align-center justify-center>
        <v-col cols="10" offset="1">
          <v-banner
            v-if="$device.isMobileOrTablet"
            outlined
            rounded
            single-line
            sticky
          >
            {{ translation }}
          </v-banner>
          <v-sheet v-for="(text, i) in group" :key="i">
            <v-list-item-content>
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
          </v-sheet>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
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

<style scoped>
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
