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
      <template v-for="text in texts">
        <v-list-item-content :key="text.id">
          <v-list-item-title class="text-wrap">
            <fun v-for="(word, i) in text.text.split(' ')" :key="i" :word="word" />
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
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="god"
            @next="getTexts()"
            @previous="getTexts()"
            @input="getTexts()"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import fun from '~/components/fun'
export default {
  name: 'BookPage',

  components: {
    fun
  },

  async fetch () {
    // await this.getTexts()
  },

  mounted () {
    this.getTexts()
  },

  computed: {
    ...mapFields(['texts', 'translation', 'page', 'pages', 'book', 'limit']),

    god () {
      return this.book.length & this.limit ? Math.floor(this.book.length / this.limit) : 0
    }
  },

  methods: {
    ...mapActions(['getTexts'])
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
