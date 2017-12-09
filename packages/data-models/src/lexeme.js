import Lemma from './lemma.js'
import Inflection from './inflection.js'
import DefinitionSet from './definition-set'

/**
 * A basic unit of lexical meaning. Contains a primary Lemma object, one or more Inflection objects
 * and optional alternate Lemmas
 */
class Lexeme {
    /**
     * Initializes a Lexeme object.
     * @param {Lemma} lemma - A lemma object.
     * @param {Inflection[]} inflections - An array of inflections.
     * @param {DefinitionSet} meaning - A set of definitions.
     */
  constructor (lemma, inflections, meaning = null) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }

    if (!(lemma instanceof Lemma)) {
      throw new Error('Lemma should be of Lemma object type.')
    }

    if (!inflections) {
      throw new Error('Inflections data should not be empty.')
    }

    if (!Array.isArray(inflections)) {
      throw new Error('Inflection data should be provided in an array.')
    }

    for (let inflection of inflections) {
      if (!(inflection instanceof Inflection)) {
        throw new Error('All inflection data should be of Inflection object type.')
      }
    }

    this.lemma = lemma
    this.inflections = inflections
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID)
  }

  static readObject (jsonObject) {
    let lemma = Lemma.readObject(jsonObject.lemma)
    let inflections = []
    for (let inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection))
    }

    let lexeme = new Lexeme(lemma, inflections)
    lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning)
    return lexeme
  }
}
export default Lexeme
