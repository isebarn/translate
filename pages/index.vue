<template>
  <v-container fluid>
    <v-list>
      <v-list-item-group
        v-model="article"
        return-object
        color="primary"
      >
        <v-list-item v-for="(article, i) in articles" :key="i" :value="article" @click="$router.push('article')">
          <v-container fluid>
            <v-card :style="clc(article.category)" class="mt-5">
              <v-img
                v-if="article.src"
                :src="article.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                contain
              >
                <v-card-title>
                  <fun :word="article.kicker ?? article.title" />
                </v-card-title>
              </v-img>
              <v-card-title v-if="article.kicker" class="text--primary">
                <fun :word="article.title" />
              </v-card-title>
              <v-card-subtitle v-if="article.lead">
                <fun :word="article.lead" />
              </v-card-subtitle>
            </v-card>
          </v-container>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import fun from '~/components/fun'
const stc = require('string-to-color')
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
    ...mapActions(['getArticles']),

    hsl (hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

      let r = parseInt(result[1], 16)
      let g = parseInt(result[2], 16)
      let b = parseInt(result[3], 16)

      r /= 255
      g /= 255
      b /= 255
      const max = Math.max(r, g, b); const min = Math.min(r, g, b)
      let h; let s; let l = (max + min) / 2

      if (max === min) {
        h = s = 0 // achromatic
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }

      s = s * 100
      s = Math.round(s)
      l = l * 100
      l = Math.round(l)
      h = Math.round(360 * h)

      const colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + 97 + '%)'
      return colorInHSL
    },
    clc (god) {
      return `background-color: ${this.hsl(stc(god))}`
    }
  }

}
</script>
