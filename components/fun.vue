<template>
  <span
    v-if="$device.isMobileOrTablet"
    style="font-family:'Droid Sans';"
    @mouseenter="translate()"
    v-text="word + ' '"
  />
  <v-tooltip v-else top>
    <template #activator="{ on, attrs }">
      <span
        style="font-family:'Droid Sans';"
        v-bind="attrs"
        @mouseenter="translate()"
        v-on="on"
        v-text="word + ' '"
      />
    </template>
    <span>{{ translation }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'WordWrap',
  props: { word: String },

  computed: {
    ...mapGetters(['translation'])
  },

  methods: {
    ...mapActions(['setTranslation']),

    async translate () {
      await this.setTranslation(this.word)
    }
  }
}
</script>
