import uuidv4 from 'uuid/v4'
import { Homonym, LanguageModelFactory as LMF } from 'alpheios-data-models'
import WordlistController from '../controllers/wordlist-controller';

export default class WordItem {
  constructor (homonym, important = false, currentSession = false) {
    this.targetWord = homonym.targetWord
    this.languageID = homonym.languageID
    this.languageCode = LMF.getLanguageCodeFromId(homonym.languageID)
    this.homonym = homonym
    this.important = important
    this.currentSession = currentSession
    this.ID = uuidv4()
  }

  makeImportant () {
    this.important = true
  }

  removeImportant () {
    this.important = false
  }

  get lemmasList () {
    return this.homonym.lexemes.map(lexeme => lexeme.lemma.word).filter( (value, index, self) => { 
      return self.indexOf(value) === index
    }).join(', ')
  }

  static uploadFromJSON (jsonObj) {
    let homonym = Homonym.readObject(jsonObj.homonym)
    return new WordItem(homonym)
  }

  /**
   * This method converts wordItem to be as jsonObject
   * it uses convertToJSON methods for each piece of the data - I will refractor all of them into Homonym methods later
   */
  convertToStorage () {
    let resultItem = { lexemes: [] }
    for (let lexeme of this.homonym.lexemes) {
      let resInflections = []
      lexeme.inflections.forEach(inflection => { resInflections.push(inflection.convertToJSONObject()) })
      
      let resMeaning = lexeme.meaning.convertToJSONObject()
      let resultLexeme = { 
        lemma: lexeme.lemma.convertToJSONObject(), 
        inflections: resInflections,
        meaning: resMeaning
      }

      resultItem.lexemes.push(resultLexeme)
    }
    resultItem.targetWord = this.targetWord
    return {
      targetWord: this.targetWord,
      languageCode: this.languageCode,
      target: {
        targetWord: this.targetWord,
        source: window.location.href,
        selector: {
          type: 'TextQuoteSelector',
          exact: this.targetWord,
          prefix: '',
          suffix: ''
        }
      },
      body: {
        dt: WordItem.currentDate,
        homonym: resultItem,
        important: this.important
      }
    }
  }

  selectWordItem () {
    WordlistController.evt.WORDITEM_SELECTED.pub(this.homonym)
  }

  static get currentDate () {
    let dt = new Date()
    return dt.getFullYear() + '/'
        + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
        + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + ' @ '
                + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + ":"  
                + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + ":" 
                + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

  }
}