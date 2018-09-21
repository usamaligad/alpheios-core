/*
 * Greek language data module
 */
import { Constants, Feature, Lemma, FeatureImporter } from 'alpheios-data-models'

import LanguageDataset from '@lib/language-dataset.js'
import ExtendedGreekData from '@lib/extended-greek-data'
import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'
import Paradigm from '@lib/paradigm.js'
import nounSuffixesCSV from '@lib/lang/greek/data/noun/suffixes.csv'
import nounFootnotesCSV from '@lib/lang/greek/data/noun/footnotes.csv'

import adjectiveSuffixesCSV from '@lib/lang/greek/data/adjective/suffixes.csv'
import adjectiveFootnotesCSV from '@lib/lang/greek/data/adjective/footnotes.csv'

import articleFormsCSV from '@lib/lang/greek/data/article/forms.csv'

import numeralFormsCSV from '@lib/lang/greek/data/numeral/forms.csv'
import numeralFootnotesCSV from '@lib/lang/greek/data/numeral/footnotes.csv'

import pronounFormsCSV from '@lib/lang/greek/data/pronoun/forms.csv'
import pronounFootnotesCSV from '@lib/lang/greek/data/pronoun/footnotes.csv'

// import GroupFeatureType from '@views/lib/group-feature-type.js'

/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */

// Verb paradigm tables
import paradigm01 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-01.json'
import paradigm02 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-02.json'
import paradigm03 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-03.json'
import paradigm04 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-04.json'
import paradigm05 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-05.json'
import paradigm06 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-06.json'
import paradigm07 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-07.json'
import paradigm08 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-08.json'
import paradigm09 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-09.json'
import paradigm10 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-10.json'
import paradigm11 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-11.json'
import paradigm12 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-12.json'
import paradigm13 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-13.json'
import paradigm14 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-14.json'
import paradigm15 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-15.json'
import paradigm16 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-16.json'
import paradigm17 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-17.json'
import paradigm18 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-18.json'
import paradigm19 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-19.json'
import paradigm20 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-20.json'
import paradigm21 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-21.json'
import paradigm22 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-22.json'
import paradigm23 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-23.json'
import paradigm24 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-24.json'
import paradigm25 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-25.json'
import paradigm26 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-26.json'
import paradigm27 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-27.json'
import paradigm28 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-28.json'
import paradigm29 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-29.json'
import paradigm30 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-30.json'
import paradigm31 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-31.json'
import paradigm32 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-32.json'
import paradigm33 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-33.json'
import paradigm34 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-34.json'
import paradigm35 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-35.json'
import paradigm36 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-36.json'
import paradigm37 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-37.json'
import paradigm38 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-38.json'
import paradigm39 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-39.json'
import paradigm40 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-40.json'
import paradigm41 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-41.json'
import paradigm42 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-42.json'
import paradigm43 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-43.json'
import paradigm44 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-44.json'
import paradigm45 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-45.json'
import paradigm46 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-46.json'
import paradigm47 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-47.json'
import paradigm48 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-48.json'
import paradigm49 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-49.json'
import paradigm50 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-50.json'
import paradigm51 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-51.json'
import paradigm52 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-52.json'
import paradigm53 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-53.json'
// Verb paradigm rules and footnotes
import verbParadigmRulesCSV from '@lib/lang/greek/data/verb/paradigm/rules.csv'
import verbParadigmFootnotesCSV from '@lib/lang/greek/data/verb/paradigm/footnotes.csv'

// Verb participle paradigm tables
import paradigm54 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-54.json'
import paradigm55 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-55.json'
import paradigm56 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-56.json'
import paradigm57 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-57.json'
import paradigm58 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-58.json'
import paradigm59 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-59.json'
import paradigm60 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-60.json'
import paradigm61 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-61.json'
import paradigm62 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-62.json'
import paradigm63 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-63.json'
import paradigm64 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-64.json'
import paradigm65 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-65.json'
import paradigm66 from '@lib/lang/greek/data/verb-participle/paradigm/tables/paradigm-66.json'
// Verb participle rules
import verbParticipleParadigmRulesCSV from '@lib/lang/greek/data/verb-participle/paradigm/rules.csv'

import papaparse from 'papaparse'

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */

// endregion Definition of grammatical features

export default class GreekLanguageDataset extends LanguageDataset {
  constructor () {
    super(GreekLanguageDataset.languageID)

    this.typeFeatures = this.model.typeFeatures
    this.typeFeatures.set(Feature.types.footnote, new Feature(Feature.types.footnote, [], GreekLanguageDataset.languageID))
    this.typeFeatures.set(Feature.types.fullForm, new Feature(Feature.types.fullForm, [], GreekLanguageDataset.languageID))
    this.typeFeatures.set(Feature.types.hdwd, new Feature(Feature.types.hdwd, [], GreekLanguageDataset.languageID))
    this.typeFeatures.set(Feature.types.dialect, new Feature(Feature.types.dialect, [], GreekLanguageDataset.languageID))

    // Create an importer with default values for every feature
    for (let feature of this.typeFeatures.values()) {
      feature.addImporter(new FeatureImporter(feature.values, true))
    }

    // Custom importers for Greek-specific feature values
    this.typeFeatures.get(Feature.types.gender).getImporter()
      .map(this.constructor.constants.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
      .map(this.constructor.constants.GEND_MASCULINE_FEMININE_NEUTER, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER])
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  static get constants () {
    // TODO: Shall we move it to constants in data models?
    return {
      GEND_MASCULINE_FEMININE: 'masculine feminine',
      GEND_MASCULINE_FEMININE_NEUTER: 'masculine feminine neuter'
    }
  }

  // For noun and adjectives
  addSuffixes (partOfSpeech, data, pofsFootnotes) {
    // An order of columns in a data CSV file
    const n = {
      suffix: 0,
      number: 1,
      grmCase: 2,
      declension: 3,
      gender: 4,
      type: 5,
      primary: 6,
      footnote: 7
    }
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let suffixValue = item[n.suffix]
      // Handle special suffix values
      if (suffixValue === noSuffixValue) {
        suffixValue = null
      }

      let primary = false
      let features = [partOfSpeech,
        this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number]),
        this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase]),
        this.typeFeatures.get(Feature.types.declension).createFromImporter(item[n.declension]),
        this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender]),
        this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])]
      if (item[n.primary] === 'primary') {
        primary = true
      }
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ')
        features.push(this.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }

      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }

      this.addInflectionData(partOfSpeech.value, Suffix, suffixValue, features, footnotes, extendedLangData)
    }
  }

  addArticleForms (partOfSpeech, data) {
    // An order of columns in a data CSV file
    const n = {
      form: 0,
      number: 1,
      grmCase: 2,
      gender: 3,
      type: 4,
      primary: 5
    }

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let formValue = item[n.form]

      let primary = false
      let features = [partOfSpeech,
        this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number]),
        this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase]),
        this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender]),
        this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])]
      if (item[n.primary] === 'primary') {
        primary = true
      }

      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }

      this.addInflectionData(partOfSpeech.value, Form, formValue, features, [], extendedLangData)
    }
  }

  // For numerals
  addNumeralForms (partOfSpeech, data, pofsFootnotes) {
    // An order of columns in a data CSV file
    // this.numeralGroupingLemmas = ['εἱς - μία - ἑν (1)', 'δύο (2)', 'τρεῖς - τρία (3)', 'τέτταρες - τέτταρα (4)']
    this.numeralGroupingLemmas = []

    const n = {
      form: 0,
      hdwd: 1,
      number: 2,
      grmCase: 3,
      gender: 4,
      type: 5,
      primary: 6,
      footnote: 7
    }
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let form = item[n.form]

      let features = [
        partOfSpeech,
        this.typeFeatures.get(Feature.types.fullForm).createFromImporter(form)
      ]

      if (item[n.hdwd]) {
        features.push(this.typeFeatures.get(Feature.types.hdwd).createFromImporter(item[n.hdwd]))

        if (this.numeralGroupingLemmas.indexOf(item[n.hdwd]) === -1) { this.numeralGroupingLemmas.push(item[n.hdwd]) }
      }

      if (item[n.number]) { features.push(this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number])) }
      if (item[n.grmCase]) { features.push(this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase])) }
      if (item[n.gender]) { features.push(this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender])) }
      if (item[n.type]) { features.push(this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])) }

      let primary = (item[n.primary] === 'primary')

      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ')
        features.push(this.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }

      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }

      this.numeralGroupingLemmas.sort((a, b) => {
        let aN = parseInt(a.match(/[0-9]+/g)[0])
        let bN = parseInt(b.match(/[0-9]+/g)[0])
        return aN - bN
      })

      this.addInflectionData(partOfSpeech.value, Form, form, features, footnotes, extendedLangData)
    }
  }

  // For pronoun
  addPronounForms (partOfSpeech, data, pofsFootnotes) {
    this.pronounGroupingLemmas = new Map([
      ['demonstrative', ['ὅδε', 'οὗτος', 'ἐκεῖνος']]
    ])

    // An order of columns in a data CSV file
    const n = {
      form: 0,
      hdwd: 1,
      grmClass: 2,
      person: 3,
      number: 4,
      grmCase: 5,
      gender: 6,
      type: 7,
      primary: 8,
      dialect: 9,
      footnote: 10
    }
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let form = item[n.form]

      let features = [
        partOfSpeech,
        this.typeFeatures.get(Feature.types.fullForm).createFromImporter(form)
      ]

      if (item[n.hdwd]) {
        features.push(this.typeFeatures.get(Feature.types.hdwd).createFromImporter(item[n.hdwd]))
      }
      if (item[n.grmClass]) { features.push(this.typeFeatures.get(Feature.types.grmClass).createFromImporter(item[n.grmClass])) }
      if (item[n.person]) { features.push(this.typeFeatures.get(Feature.types.person).createFromImporter(item[n.person])) }
      if (item[n.number]) { features.push(this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number])) }
      if (item[n.grmCase]) { features.push(this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase])) }
      if (item[n.gender]) { features.push(this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender])) }
      if (item[n.type]) { features.push(this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])) }

      let primary = (item[n.primary] === 'primary')

      // Dialects could have multiple values
      let dialects = item[n.dialect].split(',')
      if (item[n.dialect] && dialects && dialects.length > 0) {
        features.push(this.typeFeatures.get(Feature.types.dialect).createFeatures(dialects))
      }

      // Footnotes. There can be multiple footnote indexes separated by commas
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ')
        features.push(this.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }

      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }
      this.addInflectionData(partOfSpeech.value, Form, form, features, footnotes, extendedLangData)
    }
  }

  static get verbParadigmTables () {
    const partOfSpeech = Constants.POFS_VERB
    return new Map([
      ['verbpdgm1', new Paradigm(this.languageID, partOfSpeech, paradigm01)],
      ['verbpdgm2', new Paradigm(this.languageID, partOfSpeech, paradigm02)],
      ['verbpdgm3', new Paradigm(this.languageID, partOfSpeech, paradigm03)],
      ['verbpdgm4', new Paradigm(this.languageID, partOfSpeech, paradigm04)],
      ['verbpdgm5', new Paradigm(this.languageID, partOfSpeech, paradigm05)],
      ['verbpdgm6', new Paradigm(this.languageID, partOfSpeech, paradigm06)],
      ['verbpdgm7', new Paradigm(this.languageID, partOfSpeech, paradigm07)],
      ['verbpdgm8', new Paradigm(this.languageID, partOfSpeech, paradigm08)],
      ['verbpdgm9', new Paradigm(this.languageID, partOfSpeech, paradigm09)],
      ['verbpdgm10', new Paradigm(this.languageID, partOfSpeech, paradigm10)],
      ['verbpdgm11', new Paradigm(this.languageID, partOfSpeech, paradigm11)],
      ['verbpdgm12', new Paradigm(this.languageID, partOfSpeech, paradigm12)],
      ['verbpdgm13', new Paradigm(this.languageID, partOfSpeech, paradigm13)],
      ['verbpdgm14', new Paradigm(this.languageID, partOfSpeech, paradigm14)],
      ['verbpdgm15', new Paradigm(this.languageID, partOfSpeech, paradigm15)],
      ['verbpdgm16', new Paradigm(this.languageID, partOfSpeech, paradigm16)],
      ['verbpdgm17', new Paradigm(this.languageID, partOfSpeech, paradigm17)],
      ['verbpdgm18', new Paradigm(this.languageID, partOfSpeech, paradigm18)],
      ['verbpdgm19', new Paradigm(this.languageID, partOfSpeech, paradigm19)],
      ['verbpdgm20', new Paradigm(this.languageID, partOfSpeech, paradigm20)],
      ['verbpdgm21', new Paradigm(this.languageID, partOfSpeech, paradigm21)],
      ['verbpdgm22', new Paradigm(this.languageID, partOfSpeech, paradigm22)],
      ['verbpdgm23', new Paradigm(this.languageID, partOfSpeech, paradigm23)],
      ['verbpdgm24', new Paradigm(this.languageID, partOfSpeech, paradigm24)],
      ['verbpdgm25', new Paradigm(this.languageID, partOfSpeech, paradigm25)],
      ['verbpdgm26', new Paradigm(this.languageID, partOfSpeech, paradigm26)],
      ['verbpdgm27', new Paradigm(this.languageID, partOfSpeech, paradigm27)],
      ['verbpdgm28', new Paradigm(this.languageID, partOfSpeech, paradigm28)],
      ['verbpdgm29', new Paradigm(this.languageID, partOfSpeech, paradigm29)],
      ['verbpdgm30', new Paradigm(this.languageID, partOfSpeech, paradigm30)],
      ['verbpdgm31', new Paradigm(this.languageID, partOfSpeech, paradigm31)],
      ['verbpdgm32', new Paradigm(this.languageID, partOfSpeech, paradigm32)],
      ['verbpdgm33', new Paradigm(this.languageID, partOfSpeech, paradigm33)],
      ['verbpdgm34', new Paradigm(this.languageID, partOfSpeech, paradigm34)],
      ['verbpdgm35', new Paradigm(this.languageID, partOfSpeech, paradigm35)],
      ['verbpdgm36', new Paradigm(this.languageID, partOfSpeech, paradigm36)],
      ['verbpdgm37', new Paradigm(this.languageID, partOfSpeech, paradigm37)],
      ['verbpdgm38', new Paradigm(this.languageID, partOfSpeech, paradigm38)],
      ['verbpdgm39', new Paradigm(this.languageID, partOfSpeech, paradigm39)],
      ['verbpdgm40', new Paradigm(this.languageID, partOfSpeech, paradigm40)],
      ['verbpdgm41', new Paradigm(this.languageID, partOfSpeech, paradigm41)],
      ['verbpdgm42', new Paradigm(this.languageID, partOfSpeech, paradigm42)],
      ['verbpdgm43', new Paradigm(this.languageID, partOfSpeech, paradigm43)],
      ['verbpdgm44', new Paradigm(this.languageID, partOfSpeech, paradigm44)],
      ['verbpdgm45', new Paradigm(this.languageID, partOfSpeech, paradigm45)],
      ['verbpdgm46', new Paradigm(this.languageID, partOfSpeech, paradigm46)],
      ['verbpdgm47', new Paradigm(this.languageID, partOfSpeech, paradigm47)],
      ['verbpdgm48', new Paradigm(this.languageID, partOfSpeech, paradigm48)],
      ['verbpdgm49', new Paradigm(this.languageID, partOfSpeech, paradigm49)],
      ['verbpdgm50', new Paradigm(this.languageID, partOfSpeech, paradigm50)],
      ['verbpdgm51', new Paradigm(this.languageID, partOfSpeech, paradigm51)],
      ['verbpdgm52', new Paradigm(this.languageID, partOfSpeech, paradigm52)],
      ['verbpdgm53', new Paradigm(this.languageID, partOfSpeech, paradigm53)]
    ])
  }

  static get verbParticipleParadigmTables () {
    const partOfSpeech = Constants.POFS_VERB_PARTICIPLE
    return new Map([
      ['verbpdgm54', new Paradigm(this.languageID, partOfSpeech, paradigm54)],
      ['verbpdgm55', new Paradigm(this.languageID, partOfSpeech, paradigm55)],
      ['verbpdgm56', new Paradigm(this.languageID, partOfSpeech, paradigm56)],
      ['verbpdgm57', new Paradigm(this.languageID, partOfSpeech, paradigm57)],
      ['verbpdgm58', new Paradigm(this.languageID, partOfSpeech, paradigm58)],
      ['verbpdgm59', new Paradigm(this.languageID, partOfSpeech, paradigm59)],
      ['verbpdgm60', new Paradigm(this.languageID, partOfSpeech, paradigm60)],
      ['verbpdgm61', new Paradigm(this.languageID, partOfSpeech, paradigm61)],
      ['verbpdgm62', new Paradigm(this.languageID, partOfSpeech, paradigm62)],
      ['verbpdgm63', new Paradigm(this.languageID, partOfSpeech, paradigm63)],
      ['verbpdgm64', new Paradigm(this.languageID, partOfSpeech, paradigm64)],
      ['verbpdgm65', new Paradigm(this.languageID, partOfSpeech, paradigm65)],
      ['verbpdgm66', new Paradigm(this.languageID, partOfSpeech, paradigm66)]
    ])
  }

  setParadigmData (partOfSpeech, paradigms, rulesData, suppParadigmTables) {
    // An order of columns in a data CSV file
    const n = {
      id: 0,
      matchOrder: 1,
      partOfSpeech: 2, // Ignored, an argument value will be used
      stemtype: 3,
      voice: 4,
      mood: 5,
      tense: 6,
      lemma: 7,
      morphFlags: 8,
      dialect: 9
    }

    // First row contains headers
    for (let i = 1; i < rulesData.length; i++) {
      let item = rulesData[i]
      let id = item[n.id]
      let matchOrder = Number.parseInt(item[n.matchOrder])

      let features = [partOfSpeech]

      if (item[n.stemtype]) { features.push(this.typeFeatures.get(Feature.types.stemtype).createFromImporter(item[n.stemtype])) }
      if (item[n.voice]) { features.push(this.typeFeatures.get(Feature.types.voice).createFromImporter(item[n.voice])) }
      if (item[n.mood]) { features.push(this.typeFeatures.get(Feature.types.mood).createFromImporter(item[n.mood])) }
      if (item[n.tense]) { features.push(this.typeFeatures.get(Feature.types.tense).createFromImporter(item[n.tense])) }
      if (item[n.dialect]) { features.push(this.typeFeatures.get(Feature.types.dialect).createFromImporter(item[n.dialect])) }

      let lemma
      if (item[n.lemma]) {
        lemma = new Lemma(item[n.lemma], this.constructor.languageID)
      }

      let morphFlags = ''
      if (item[n.morphFlags]) {
        morphFlags = item[n.morphFlags]
      }

      if (paradigms.has(id)) {
        paradigms.get(id).addRule(matchOrder, features, lemma, morphFlags)
      } else {
        console.warn(`Cannot find a paradigm table for "${id}" index`)
      }
    }
    for (let paradigm of paradigms.values()) {
      paradigm.sortRules()
      paradigm.addSuppTables(suppParadigmTables)
    }
    return Array.from(paradigms.values())
  }

  addFootnotes (partOfSpeech, classType, data) {
    let footnotes = []
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const footnote = this.addFootnote(partOfSpeech.value, classType, data[i][0], data[i][1])
      footnotes.push(footnote)
    }
    return footnotes
  }

  loadData () {
    let partOfSpeech
    let suffixes
    let forms
    let paradigms
    let pofsFootnotes
    let footnotes

    // Nouns
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    pofsFootnotes = papaparse.parse(nounFootnotesCSV, {})
    footnotes = this.addFootnotes(partOfSpeech, Suffix, pofsFootnotes.data)
    suffixes = papaparse.parse(nounSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data, footnotes)

    // Adjective
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    pofsFootnotes = papaparse.parse(adjectiveFootnotesCSV, {})
    footnotes = this.addFootnotes(partOfSpeech, Suffix, pofsFootnotes.data)
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data, footnotes)

    // Articles
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ARTICLE)
    forms = papaparse.parse(articleFormsCSV, {})
    this.addArticleForms(partOfSpeech, forms.data)

    // Pronouns
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    pofsFootnotes = papaparse.parse(pronounFootnotesCSV, {})
    footnotes = this.addFootnotes(partOfSpeech, Form, pofsFootnotes.data)
    forms = papaparse.parse(pronounFormsCSV, {})
    this.addPronounForms(partOfSpeech, forms.data, footnotes)

    // Numerals
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    pofsFootnotes = papaparse.parse(numeralFootnotesCSV, {})
    footnotes = this.addFootnotes(partOfSpeech, Form, pofsFootnotes.data)
    forms = papaparse.parse(numeralFormsCSV, {})
    this.addNumeralForms(partOfSpeech, forms.data, footnotes)

    // Verbs
    // Paradigms
    const verbParadigmTables = this.constructor.verbParadigmTables
    const verbParticipleParadigmTables = this.constructor.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    paradigms = this.setParadigmData(
      partOfSpeech, verbParadigmTables,
      papaparse.parse(verbParadigmRulesCSV, {}).data, verbAndParticipleParadigmTables)
    this.addParadigms(partOfSpeech, paradigms)
    this.addFootnotes(partOfSpeech, Paradigm, papaparse.parse(verbParadigmFootnotesCSV, {}).data)

    // Verb Participles
    // Paradigms
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    paradigms = this.setParadigmData(
      partOfSpeech, verbParticipleParadigmTables,
      papaparse.parse(verbParticipleParadigmRulesCSV, {}).data, verbAndParticipleParadigmTables)
    this.addParadigms(partOfSpeech, paradigms)

    this.dataLoaded = true
    return this
  }

  isIrregular (inflection) {
    // All pronouns are irregular right now
    return inflection[Feature.types.part].value === Constants.POFS_PRONOUN
  }

  /**
   * Returns an array of lemmas that are used to group values within inflection tables,
   * such as for demonstrative pronouns
   * @param {string} grammarClass - A name of a pronoun class
   * @return {string[]} An array of lemma values
   */
  getPronounGroupingLemmas (grammarClass) {
    return this.pronounGroupingLemmas.has(grammarClass) ? this.pronounGroupingLemmas.get(grammarClass) : []
  }

  getPronounGroupingLemmaFeatures (grammarClass) {
    return this.getPronounGroupingLemmas(grammarClass).map(lemma => new Feature(Feature.types.hdwd, lemma, GreekLanguageDataset.languageID))
  }

  getNumeralGroupingLemmas () {
    return this.numeralGroupingLemmas
  }

  getNumeralGroupingLemmaFeatures () {
    return this.numeralGroupingLemmas.map(lemma => new Feature(Feature.types.hdwd, lemma, GreekLanguageDataset.languageID))
  }

  static getObligatoryMatchList (inflection) {
    if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_PRONOUN)) {
      // If it is a pronoun, it must match a grammatical class
      return [Feature.types.part, Feature.types.grmClass]
    } else if ([Constants.POFS_NUMERAL, Constants.POFS_ARTICLE].includes(inflection[Feature.types.part].value)) {
      // If it is a numeral, it must match a part of speach
      return [Feature.types.part]
    } else if (inflection.constraints.fullFormBased) {
      // Not a pronoun, but the other form-based word
      return [Feature.types.part, Feature.types.fullForm]
    } else {
      // Default value for suffix matching
      return [Feature.types.part]
    }
  }

  static getOptionalMatchList (inflection) {
    let featureOptions = []

    if ([Constants.POFS_PRONOUN, Constants.POFS_NUMERAL, Constants.POFS_ARTICLE].includes(inflection[Feature.types.part].value)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number
      ]
    } else if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_ADJECTIVE)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.declension
      ]
    } else {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.declension,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.person
      ]
    }

    return featureOptions.filter(f => inflection[f])
  }

  /**
   * Returns a list of features that should be the same for the morphology match.
   * @param {Inflection} inflection - An inflection for which a list needs to be built.
   * @return {string[]} An array of feature names.
   */
  static getMorphologyMatchList (inflection) {
    let featureOptions = []

    if ([Constants.POFS_PRONOUN, Constants.POFS_NUMERAL, Constants.POFS_ARTICLE].includes(inflection[Feature.types.part].value)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.person

      ]
    } else if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_ADJECTIVE)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.declension
      ]
    } else {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.declension,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.person
      ]
    }

    return featureOptions.filter(f => inflection[f])
  }
}