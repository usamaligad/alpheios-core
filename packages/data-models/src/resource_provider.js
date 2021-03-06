/**
 * An abstraction of an Alpheios resource provider
 */
class ResourceProvider {
  /**
   * @param {string} uri - a unique resource identifier for this provider
   * @param {string} rights - rights text
   * @param {Map} rightsTranslations - optional map of translated rights text - keys should be language of text, values the text
   */
  constructor (uri = '', rights = '', rightsTranslations = new Map([['default', rights]])) {
    this.uri = uri
    this.rights = rightsTranslations
    if (!this.rights.has('default')) {
      this.rights.set('default', rights)
    }
  }

  /**
   * @returns a string representation of the resource provider, in the default language
   */
  toString () {
    return this.rights.get('default')
  }

  /**
   * Produce a string representation of the resource provider, in the requested locale if available
   *
   * @param {string} languageCode
   * @returns a string representation of the resource provider, in the requested locale if available
   */
  toLocaleString (languageCode) {
    return this.rights.get(languageCode) || this.rights.get('default')
  }

  static getProxy (provider = null, target = {}) {
    return new Proxy(target, {
      get: function (target, name) {
        return name === 'provider' ? provider : target[name]
      }
    })
  }

  convertToJSONObject () {
    let rights = {} // eslint-disable-line prefer-const
    for (const [key, value] of this.rights.entries()) {
      rights[key] = value
    }

    const resultProvider = {
      uri: this.uri,
      rights
    }
    return resultProvider
  }

  static readObject (jsonObject) {
    const rights = new Map() // eslint-disable-line prefer-const
    if (jsonObject.rights) {
      Object.keys(jsonObject.rights).forEach(key => {
        rights.set(key, jsonObject.rights[key])
      })
    }

    return new ResourceProvider(jsonObject.uri, '', rights)
  }
}

export default ResourceProvider
