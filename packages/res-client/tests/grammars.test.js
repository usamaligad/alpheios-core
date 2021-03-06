/* eslint-env jest */
'use strict'

import Grammars from '@resclient/grammars.js'
import { Constants } from 'alpheios-data-models'

describe('BaseAdapter object', () => {
  beforeAll(() => {
    window.fetch = require('jest-fetch-mock')
  })

  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('getGrammarAdapters', () => {
    let langId = Constants.LANG_LATIN
    let adapters = Grammars.getGrammarAdapters(langId,{})
    expect(adapters.length).toEqual(2)
    expect(adapters[0].resid).toEqual('https://github.com/alpheios-project/grammar-bennett')
    expect(adapters[1].resid).toEqual('https://github.com/alpheios-project/grammar-allen-greenough')
  })

  it('gets preferred grammarAdapter', () => {
    let langId = Constants.LANG_LATIN
    let adapters = Grammars.getGrammarAdapters(langId,{prefer: 'https://github.com/alpheios-project/grammar-allen-greenough'})
    expect(adapters.length).toEqual(1)
    expect(adapters[0].resid).toEqual('https://github.com/alpheios-project/grammar-allen-greenough')
  })
})
