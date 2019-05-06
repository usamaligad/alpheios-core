<template>
  <div
      :class="rootClasses"
      :style="componentStyles"
      class="alpheios-panel alpheios-panel--large alpheios-content"
      data-component="alpheios-panel"
      data-resizable="true"
      :data-resized="resized"
      id="alpheios-panel-inner"
      v-on-clickaway="closePanel"
      v-show="$store.state.panel.visible"
  >

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <logo-icon class="alpheios-logo-on-dark"/>
      </div>

      <div class="alpheios-panel__header-btn-group--center">
        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_LEFT')" tooltipDirection="bottom-narrow"
                      v-show="isAttachedToRight">
          <span @click="setPosition('left')"
                class="alpheios-navbuttons__btn alpheios-navbuttons__btn--attach">
              <attach-left-icon></attach-left-icon>
          </span>
        </alph-tooltip>

        <navbuttons-large></navbuttons-large>

        <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MOVE_PANEL_RIGHT')" tooltipDirection="bottom-narrow"
                      v-show="isAttachedToLeft">
          <span @click="setPosition('right')"
                class="alpheios-navbuttons__btn alpheios-navbuttons__btn--attach">
              <attach-right-icon></attach-right-icon>
          </span>
        </alph-tooltip>
      </div>

      <div class="alpheios-panel__header-btn-group--end">
        <alph-tooltip
            :tooltipText="l10n.getText('TOOLTIP_CLOSE_PANEL')"
            tooltipDirection="bottom-right">
          <div @click="ui.closePanel" class="alpheios-panel__close-btn">
              <close-icon></close-icon>
          </div>
        </alph-tooltip>
      </div>
    </div>

    <div class="alpheios-panel__content">
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__definitions"
          v-show="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
          >
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-defs`"
          />
        </div>
        <div v-if="$store.getters['app/defDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem"
               v-for="definition in formattedShortDefinitions"
          >
            <shortdef
                :definition="definition"
                :languageCode="$store.state.app.languageCode"
            />
          </div>
          <div
              class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
              v-html="formattedFullDefinitions"/>
        </div>
        <div v-else>
          {{ l10n.getText('PLACEHOLDER_DEFINITIONS') }}
        </div>
        <div
            class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
             v-html="formattedFullDefinitions"
        />
      </div>

      <div
          :id="inflectionsPanelID"
          class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
          v-show="$store.state.app.hasInflData && $store.getters['ui/isActiveTab']('inflections')"
          data-alpheios-ignore="all"
      >
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_PANEL') }}
        </h1>
        <inflections class="alpheios-panel-inflections"></inflections>
      </div>

      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_BROWSER_PANEL') }}
        </h1>
        <inflection-browser/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding"
            data-alpheios-ignore="all"
            v-show="$store.getters['ui/isActiveTab']('grammar')">
        <grammar></grammar>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank')"
          data-alpheios-ignore="all">
        <treebank/>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
           v-show="$store.getters['ui/isActiveTab']('status')"
           data-alpheios-ignore="all">
         <!-- Messages to be displayed in a status panel -->
        <div v-for="message in $store.state.ui.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__user"
          v-if="$store.state.auth.enableLogin" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab-panel--scroll"
          v-show="$store.getters['ui/isActiveTab']('wordUsage')"
        >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
        <reskin-font-color></reskin-font-color>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.preferredLanguage"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.panelPosition"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.popupPosition"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.uiType"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.verboseMode"
            @change="contentOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.skin"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.panel"
            @change="uiOptionChanged"
            v-show="app.isDevMode()"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.uiOptions.items.panelOnActivate"
            @change="uiOptionChanged"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexicons"
        >
        </setting>
        <setting
            :classes="['alpheios-panel__options-item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexiconsShort"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.enableWordUsageExamples"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesON"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesAuthMax"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.wordUsageExamplesMax"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.enableLemmaTranslations"
            @change="contentOptionChanged"
        >
        </setting>

        <setting
            :classes="['alpheios-panel__options-item']"
            :data="settings.contentOptions.items.locale"
            @change="contentOptionChanged"
        >
        </setting>
        <div>
          <button @click="resetAllOptions"
              class="alpheios-button-primary">{{l10n.getText('LABEL_RESET_OPTIONS')}}
          </button>
        </div>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__info"
           v-show="$store.getters['ui/isActiveTab']('info')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_HELP_PANEL') }}
        </h1>
        <div class="alpheios-lookup__panel">
          <lookup
              :name-base="`panel-info`"
          />
        </div>
        <info></info>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
           data-alpheios-ignore="all"
      >
        <word-list-panel/>
      </div>
    </div>

    <notification-area/>
  </div>
</template>
<script>
/*
    This is a desktop version of a panel
     */
// JS imports
import interact from 'interactjs'
// UI components
import NavbuttonsLarge from '@/vue/components/nav/navbuttons-large.vue'
// SVG icons
import LogoIcon from '@/images/alpheios/logo.svg'
import AttachLeftIcon from '@/images/inline-icons/attach-left.svg'
import AttachRightIcon from '@/images/inline-icons/attach-right.svg'
// Vue components
import CompactPanel from '@/vue/components/panel-compact.vue'

export default {
  name: 'PanelLarge',
  extends: CompactPanel,
  components: {
    navbuttonsLarge: NavbuttonsLarge,
    logoIcon: LogoIcon,
    attachLeftIcon: AttachLeftIcon,
    attachRightIcon: AttachRightIcon
  },
  // A minimal width of a panel, in pixels. It should be large enough to fit all the buttons of a large size into the panel
  minWidth: 698,
  // Maximum allowed size of a panel, as percentage of the viewport width.
  maxWidthPct: 80,

  computed: {
    rootClasses () {
      return this.$options.positionClassVariants[this.$store.state.panel.position]
    }
  },

  mounted: function () {
    // Determine paddings and sidebar width for calculation of a panel width to fit content
    if (typeof this.$el.querySelector === 'function') {
      const maxWidth = Math.floor(document.documentElement.clientWidth / 100 * this.$options.maxWidthPct)

      // Initialize Interact.js: make panel resizable
      interact(this.$el)
        .resizable({
          // resize from all edges and corners
          edges: { left: true, right: true, bottom: false, top: false },

          // keep the edges inside the parent
          restrictEdges: {
            outer: document.body,
            endOnly: true
          },

          // minimum size
          restrictSize: {
            min: { width: this.$options.minWidth },
            max: { width: maxWidth }
          },

          inertia: true
        })
        .on('resizemove', event => {
          let target = event.target
          // Indicate that panel received a custom size
          this.resized = true
          // update the element's style
          target.style.width = `${event.rect.width}px`
        })
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-panel--large {
    height: 100vh;
    top: 0;

    & .alpheios-panel__content {
      max-width: 80vw;
    }

    .alpheios-navbuttons__btn {
      svg {
        width: uisize(28px);
      }
    }

    &.alpheios-panel--left {
      .alpheios-panel__header {
        padding-left: uisize(14px);
      }
    }

    .alpheios-panel__header-logo {
      width: uisize(44px);
      height: auto;
    }

    .alpheios-panel__header-btn-group--center {
      direction: ltr;
      display: flex;
      flex-wrap: nowrap;
      box-sizing: border-box;
      align-items: stretch;
    }

    .alpheios-navbuttons__btn--attach {
      stroke-width: 2.5;
    }

    .alpheios-panel__close-btn {
      width: uisize(80px);
    }
  }
</style>