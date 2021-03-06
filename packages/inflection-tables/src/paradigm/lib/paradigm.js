import uuidv4 from 'uuid/v4'
import { Feature, Logger } from 'alpheios-data-models'
import ParadigmRule from '@/paradigm/lib/paradigm-rule.js'
import ParadigmInflectionList from '@/paradigm/lib/paradigm-inflection-list.js'

export default class Paradigm {
  constructor (languageID, partOfSpeech, paradigm) {
    this.id = uuidv4()
    this.paradigmID = paradigm.ID
    this.languageID = languageID
    this.partOfSpeech = partOfSpeech
    this.title = paradigm.title

    // this.table = paradigm.table
    this.table = { rows: [] }
    paradigm.table.rows.forEach(row => {
      const newRow = { cells: [] }
      row.cells.forEach(cell => { newRow.cells.push(Object.assign({}, cell)) })
      this.table.rows.push(newRow)
    })

    this.hasCredits = !!paradigm.credits
    this.creditsText = paradigm.credits ? paradigm.credits : ''
    this.subTables = paradigm.subTables
    this.rules = []

    // Convert string feature values to Feature objects for later comparison
    this.tableCellValuesToFeatures(this.table)
    if (this.subTables) {
      for (const table of this.subTables) {
        this.tableCellValuesToFeatures(table)
      }
    }

    /**
     * Sometimes paradigm sub tables may have links to another paradigms.
     * Those supplemental paradigms will be saved in the map.
     * @type {Map<{string} paradigmID, {Paradigm} paradigm>}
     * @private
     */
    this._suppParadigms = new Map()
  }

  // Convert string feature values of a table to Feature objects for later comparison
  tableCellValuesToFeatures (table) {
    for (const row of table.rows) {
      for (let cell of row.cells) { // eslint-disable-line prefer-const
        if (cell.role === 'data') {
          let cellFeatures = [] // eslint-disable-line prefer-const
          for (const prop of Object.keys(cell)) {
            // Eliminate "non-feature" keys
            if (prop !== 'role' && prop !== 'value'  && prop !== 'lemma') {
              cellFeatures.push(prop)
            }
          }
          for (const feature of cellFeatures) {
            if (typeof cell[feature] === 'string') {
              const values = cell[feature].split(' ')
              // TODO this should be done via an importer but changing this code
              // would require retesting of all of the paradigm table matching
              // so hacking a specific workaround for now
              values.forEach((v, index, values) => { values[index] = v.replace(/future_perfect/, 'future perfect') })
              values.forEach((v, index, values) => { values[index] = v.replace(/verb_participle/, 'verb participle') })
              cell[feature] = new Feature(feature, values, this.languageID)
            }
          }
          // if the paradigm data doesn't explicitly define a part of speech, then set it from the paradigm
          if (!cell[Feature.types.part]) {
            cell[Feature.types.part] = new Feature(Feature.types.part, this.partOfSpeech, this.languageID)
          }
        }
      }
    }
  }

  /**
   * Creates a list of items of the same type as self
   * @return {ParadigmInflectionList}
   */
  static createList () {
    return new ParadigmInflectionList(this)
  }

  /**
   * Adds a rule to the paradigm.
   * @param {number} matchOrder
   * @param {Feature[]} features
   * @param {Lemma} lemma
   * @param morphFlags
   */
  addRule (matchOrder, features, lemma, morphFlags) {
    this.rules.push(new ParadigmRule(matchOrder, features, lemma, morphFlags))
  }

  sortRules () {
    this.rules.sort((a, b) => b.matchOrder - a.matchOrder)
  }

  /**
   * Scans paradigm sub tables for other paradigm tables links and, if found,
   * stores paradigms the found links refers to into a `_suppParadigms` prop.
   * @param {Map<{string} paradigmID, {Paradigm} paradigm>} paradigmMap - A map of all known paradigms.
   */
  addSuppTables (paradigmMap) {
    for (const subTable of this.subTables) {
      for (const row of subTable.rows) {
        for (const cell of row.cells) {
          if (cell.hasOwnProperty('reflink')) { // eslint-disable-line no-prototype-builtins
            if (paradigmMap.has(cell.reflink.id)) {
              this._suppParadigms.set(cell.reflink.id, paradigmMap.get(cell.reflink.id))
            } else {
              Logger.getInstance().warn(`"${cell.reflink.id}" supplemental table is not found`)
            }
          }
        }
      }
    }
  }

  /**
   * Whether this paradigm has any linked paradigms stored.
   * @return {boolean}
   */
  get hasSuppParadigms () {
    return this._suppParadigms.size > 0
  }

  /**
   * Returns an array of linked paradigms.
   * @return {Paradigm[]}
   */
  get suppParadigmList () {
    return Array.from(this._suppParadigms.values())
  }

  /**
   * Returns linked paradigms in a map.
   * @return {Map<{string}, paradigmID, {Paradigm}, paradigm>}
   */
  get suppParadigmsMap () {
    return this._suppParadigms
  }

  /**
   * Returns an array of rules that matches an inflection or an empty array if not matching rules found.
   * @param {Inflection} inflection.
   * @return {ParadigmRule[] | []} Array of matching rules or an empty array if no matches found.
   */
  matchingRules (inflection) {
    return this.rules.filter(r => r.matches(inflection))
  }
}
