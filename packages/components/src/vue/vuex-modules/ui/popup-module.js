import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Popup from '@/vue/components/popup.vue'
import { getLanguageName } from '@/lib/utility/language-names.js'

export default class PopupModule {
  constructor (store, api, uiController) {
    this._uiController = uiController
    this.vi = new Vue({
      el: `#${this._uiController.options.template.popupId}`,
      store: store,
      provide: api, // Expose APIs to child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        popup: Popup
      },
      data: {
        messages: [],
        lexemes: [],
        definitions: {},

        translations: {},

        linkedFeatures: [],
        visible: false,
        popupData: {
          fixedPosition: true, // Whether to put popup into a fixed position or calculate that position dynamically
          // Default popup position, with units
          top: '10vh',
          left: '10vw',

          draggable: this._uiController.options.template.draggable,
          resizable: this._uiController.options.template.resizable,
          // Default popup dimensions, in pixels, without units. These values will override CSS rules.
          // Can be scaled down on small screens automatically.
          width: 210,
          /*
          `fixedElementsHeight` is a sum of heights of all elements of a popup, including a top bar, a button area,
          and a bottom bar. A height of all variable elements (i.e. morphological data container) will be
          a height of a popup less this value.
           */
          fixedElementsHeight: 120,
          heightMin: 150, // Initially, popup height will be set to this value
          heightMax: 400, // If a morphological content height is greater than `contentHeightLimit`, a popup height will be increased to this value
          // A margin between a popup and a selection
          placementMargin: 15,
          // A minimal margin between a popup and a viewport border, in pixels. In effect when popup is scaled down.
          viewportMargin: 5,

          // A position of a word selection
          targetRect: {},

          /*
          A date and time when a new request was started, in milliseconds since 1970-01-01. It is used within a
          component to identify a new request coming in and to distinguish it from data updates of the current request.
           */
          requestStartTime: 0,
          settings: this._uiController.contentOptions.items,
          verboseMode: this._uiController.contentOptions.items.verboseMode.currentValue === this._uiController.options.verboseMode,
          defDataReady: false,
          hasTreebank: false,
          inflDataReady: this._uiController.inflDataReady,
          morphDataReady: false,

          translationsDataReady: false,

          showProviders: false,
          updates: 0,
          classes: [], // Will be set later by `setRootComponentClasses()`
          notification: {
            visible: false,
            important: false,
            showLanguageSwitcher: false,
            text: ''
          },
          providers: [],
          status: {
            selectedText: '',
            languageName: '',
            languageCode: ''
          },
          currentLanguage: null,
          resourceSettings: this._uiController.resourceOptions.items,
          styles: {
            zIndex: this._uiController.zIndex
          }
        },
        panel: this._uiController.panel,
        options: this._uiController.contentOptions,
        resourceOptions: this._uiController.resourceOptions,
        currentPopupComponent: this._uiController.options.template.defaultPopupComponent,
        uiController: this._uiController,
        classesChanged: 0
      },
      methods: {
        setTargetRect: function (targetRect) {
          this.popupData.targetRect = targetRect
        },

        showMessage: function (message) {
          this.messages = [message]
          return this
        },

        appendMessage: function (message) {
          this.messages.push(message)
          return this
        },

        clearMessages: function () {
          while (this.messages.length > 0) {
            this.messages.pop()
          }
          return this
        },

        showNotification: function (text, important = false) {
          this.popupData.notification.visible = true
          this.popupData.notification.important = important
          this.popupData.notification.showLanguageSwitcher = false
          this.popupData.notification.text = text
        },

        showImportantNotification: function (text) {
          this.showNotification(text, true)
        },

        showLanguageNotification: function (homonym, notFound = false) {
          this.popupData.notification.visible = true
          let languageName
          if (homonym) {
            languageName = getLanguageName(homonym.languageID).name
          } else if (this.popupData.currentLanguageName) {
            languageName = this.popupData.currentLanguageName
          } else {
            // TODO this wil be unnecessary when the morphological adapter returns a consistent response for erors
            languageName = this.$options.api.l10n.getMsg('TEXT_NOTICE_LANGUAGE_UNKNOWN')
          }
          if (notFound) {
            this.popupData.notification.important = true
            this.popupData.notification.showLanguageSwitcher = true
            this.popupData.notification.text = this.$options.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE', { languageName: languageName })
          } else {
            this.popupData.notification.important = false
            this.popupData.notification.showLanguageSwitcher = false
          }
        },

        showStatusInfo: function (selectionText, languageID) {
          let langDetails = getLanguageName(languageID)
          this.popupData.status.languageName = langDetails.name
          this.popupData.status.languageCode = langDetails.code
          this.popupData.status.selectedText = selectionText
        },

        showErrorInformation: function (errorText) {
          this.popupData.notification.visible = true
          this.popupData.notification.important = true
          this.popupData.notification.showLanguageSwitcher = false
          this.popupData.notification.text = errorText
        },

        newLexicalRequest: function () {
          this.popupData.requestStartTime = new Date().getTime()
          this.panel.vi.panelData.inflBrowserTablesCollapsed = true // Collapse all inflection tables in a browser
        },

        clearContent: function () {
          this.definitions = {}
          this.translations = {}

          this.lexemes = []
          this.popupData.providers = []
          this.popupData.defDataReady = false
          this.popupData.inflDataReady = false
          this.popupData.morphDataReady = false

          this.popupData.translationsDataReady = false

          this.popupData.showProviders = false
          this.popupData.hasTreebank = false
          this.clearNotifications()
          this.clearStatus()
          return this
        },

        clearNotifications: function () {
          this.popupData.notification.visible = false
          this.popupData.notification.important = false
          this.popupData.notification.showLanguageSwitcher = false
          this.popupData.notification.text = ''
        },

        clearStatus: function () {
          this.popupData.status.languageName = ''
          this.popupData.status.languageCode = ''
          this.popupData.status.selectedText = ''
        },

        open: function () {
          this.visible = true
          return this
        },

        close: function () {
          this.visible = false
          return this
        },

        showPanelTab: function (tabName) {
          this.panel.vi.changeTab(tabName)
          this.panel.vi.open()
          return this
        },

        sendFeature: function (feature) {
          this.panel.vi.requestGrammar(feature)
          this.panel.vi.changeTab('grammar')
          this.panel.vi.open()
          return this
        },

        settingChange: function (name, value) {
          console.log('Change inside instance', name, value)
          this.options.items[name].setTextValue(value)
          switch (name) {
            case 'locale':
              if (this.uiController.presenter) {
                this.uiController.presenter.setLocale(this.options.items.locale.currentValue)
              }
              this.uiController.updateLemmaTranslations()
              break
            case 'preferredLanguage':
              this.uiController.updateLanguage(this.options.items.preferredLanguage.currentValue)
              break
          }
        },

        resourceSettingChange: function (name, value) {
          let keyinfo = this.resourceOptions.parseKey(name)
          console.log('Change inside instance', keyinfo.setting, keyinfo.language, value)
          this.resourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
        },

        uiOptionChange: function (name, value) {
          // TODO this should really be handled within OptionsItem
          // the difference between value and textValues is a little confusing
          // see issue #73
          if (name === 'fontSize' || name === 'colorSchema') {
            this.uiController.uiOptions.items[name].setValue(value)
          } else {
            this.uiController.uiOptions.items[name].setTextValue(value)
          }

          switch (name) {
            case 'skin':
              this.uiController.changeSkin(this.uiController.uiOptions.items[name].currentValue)
              break
            case 'popup':
              this.uiController.popup.vi.close() // Close an old popup
              this.uiController.popup.vi.currentPopupComponent = this.uiController.uiOptions.items[name].currentValue
              this.uiController.popup.vi.open() // Will trigger an initialisation of popup dimensions
              break
            case 'fontSize':
              this.uiController.updateFontSizeClass(value)
              break
            case 'colorSchema':
              this.uiController.updateColorSchemaClass(value)
              break
          }
        }
      }
    })
  }
}
