<template>
  <div v-show="view.wideTable">
    <div @click="collapse" class="alpheios-inflections__title">
      {{view.title}}
      <span v-show="state.collapsed">[+]</span>
      <span v-show="!state.collapsed">[-]</span>
    </div>

    <template v-if="!state.collapsed">
      <div class="infl-prdgm-tbl">
        <div class="infl-prdgm-tbl__row" v-for="row in view.wideTable.rows">
          <div :class="cellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="cell in row.cells">
            {{cell.value}}
          </div>
        </div>
      </div>
      <sub-tables-wide :view="view" @navigate="navigate"></sub-tables-wide>
    </template>
  </div>
</template>
<script>
import WideSubTables from '@/vue/components/inflections/inflections-subtables-wide.vue'

export default {
  name: 'InflectionsTablePrerendered',
  components: {
    subTablesWide: WideSubTables
  },
  props: {
    // An inflection table view
    view: {
      type: [Object, Boolean],
      required: true
    },
    collapsed: {
      type: [Boolean],
      default: true,
      required: false
    }
  },

  data: function () {
    return {
      state: {
        collapsed: true
      },
      elementIDs: {
        wideView: 'alph-inflection-table-wide',
        footnotes: 'alph-inflection-footnotes'
      }
    }
  },

  computed: {},
  watch: {
    collapsed: function (state) {
      if (this.collapsed !== null) {
        this.state.collapsed = state
      }
    }
  },
  mounted: function () {
    // Set a default value by the parent component
    if (this.collapsed !== null) {
      this.state.collapsed = this.collapsed
    }
  },
  methods: {
    collapse: function () {
      this.state.collapsed = !this.state.collapsed
    },

    cellClasses: function (cell) {
      return {
        'infl-prdgm-tbl-cell--label': (cell.role === 'label'),
        'infl-prdgm-tbl-cell--data': (cell.role === 'data'),
        'infl-prdgm-tbl-cell--full-match': (cell.role === 'data') && cell.fullMatch
      }
    },

    navigate: function (reflink) {
      this.$emit('navigate', reflink)
    }
  }
}
</script>
<style lang="scss">
.alpheios-inflections__title {
  cursor: pointer;
}
</style>
