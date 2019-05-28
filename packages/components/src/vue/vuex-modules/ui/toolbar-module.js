import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import ToolbarCompact from '@/vue/components/nav/toolbar-compact.vue'
import ToolbarLarge from '@/vue/components/nav/toolbar-large.vue'
import Platform from '@/lib/utility/platform.js'

// TODO: Add a check for required modules
export default class ToolbarModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    // Create the mount point as the last child of the page's body
    let el = document.createElement('div')
    let mountEl = document.querySelector(this.config.mountInto)
    if (!mountEl) {
      console.warn(`A ${this.config.mountInto} element for mounting ${this.constructor.moduleName} is not found. Will mount into the body instead`)
      mountEl = document.body
    }
    let viEl = mountEl.appendChild(el)

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    let component = this.config.platform.isDesktop ? ToolbarLarge : ToolbarCompact
    let VueComponentClass = Vue.extend(component)
    this._vi = new VueComponentClass({
      parent: this.constructor.rootVi,
      data: () => {
        return {
          // Make module configuration directly accessible by the module's Vue instance as a data prop
          moduleConfig: this.config
        }
      }
    })

    /* this._vi = new Vue({
      el: this.config.mountPoint,
      store: store, // Install store into the toolbar
      provide: api, // Public API of the modules for child components
      /!*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       *!/
      api: api,
      components: {
        toolbarCompact: ToolbarCompact,
        toolbarLarge: ToolbarLarge
      },
      data: {
        moduleData: {
          initialShift: this.config.initialShift,
          initialPos: this.config.initialPos
        }
      }
    }) */
    this._vi.$mount(viEl)
  }

  activate () {
    super.activate()
    // Open a toolbar on activation
    this._vi.$store.commit(`toolbar/open`)
  }

  deactivate () {
    super.deactivate()
    // Close a toolbar on deactivation
    this._vi.$store.commit(`toolbar/close`)
  }
}

ToolbarModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a toolbar is shown or hidden
      visible: false,
      // Choose compact or large layout from the value of the `platform` prop of a configuration object
      layout: moduleInstance.config.platform.isDesktop ? `toolbarLarge` : 'toolbarCompact'
    },
    mutations: {
      /**
       * Opens a toolbar
       * @param state
       */
      open (state) {
        state.visible = true
      },

      /**
       * Closes a toolbar
       * @param state
       */
      close (state) {
        state.visible = false
      }
    }
  }
}

ToolbarModule._configDefaults = {
  _moduleName: 'toolbar',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [Platform.deviceTypes.DESKTOP, Platform.deviceTypes.MOBILE],
  // A selector that specifies to what DOM element a nav will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-toolbar',
  // Initial position of a toolbar, in pixels. Any combination of positioning parameters (top, right, bottom, left)
  // in two different dimensions (X and Y) must be specified. Pixel units should NOT be added to the values.
  // Default values are the ones below.
  initialPos: {
    top: '10px',
    right: '15px'
  },
  // How much a toolbar is shifted from its initial position.
  initialShift: {
    x: 0,
    y: 0
  }
}
