import { Constants, GreekLanguageModel, Feature } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'
import Table from '../../../lib/table'

/**
 * Used for personal pronouns. Produces a table grouped into columns by person
 */
export default class GreekPersonPronounView extends GreekPronounView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale, GreekPersonPronounView.classes[0])

    // Add persons
    this.features.persons = GroupFeatureType.createFromType(Feature.types.person, this.constructor.languageID, 'Person')

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.persons, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.persons]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  static get viewID () {
    return 'greek_person_pronoun_view'
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_PERSONAL]
  }
}
