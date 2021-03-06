/* eslint-env jest */
/* eslint-disable no-unused-vars */
import GroupFeatureType from '@views/lib/group-feature-type.js'
import { Constants, Feature, FeatureType } from 'alpheios-data-models'

describe('group-feature-type.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testGenderFeature

  beforeAll(() => {
    testGenderFeature = new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 GroupFeatureType - constructor fills properties and executes render', () => {
    let GFT = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [testGenderFeature])

    expect(GFT.type).toEqual(Feature.types.gender)
    expect(GFT.languageID).toEqual(Constants.LANG_GREEK)
    expect(GFT.groupTitle).toEqual('Gender')
    expect(GFT._formsColumn).toBeFalsy()
    expect(GFT._formsRow).toBeFalsy()
    expect(GFT.hasColumnRowTitle).toBeFalsy()
    expect(GFT.hasFullWidthRowTitle).toBeFalsy()
  })

  // This function has been removed from GroupFeatureType
  /* it('2 GroupFeatureType - featuresToValues - returns array with only feature\'s values', () => {
    let featuresArray = []
    featuresArray.push(new Feature(Feature.types.gender, ['masculine', 'femine'], Constants.LANG_GREEK))
    featuresArray.push(new Feature(Feature.types.gender, 'neuter', Constants.LANG_GREEK))

    expect(GroupFeatureType.featuresToValues(featuresArray)).toEqual(['masculine femine', 'neuter'])
  }) */

  // This function has been removed from GroupFeatureType
  /* it('3 GroupFeatureType - createTitleCell - creates RowTitleCell', () => {
    let GFT = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [testGenderFeature])
    let titleCell = GFT.createTitleCell('Gender', 4)

    expect(titleCell.feature.type).toEqual(Feature.types.gender)
  }) */

  it('4 GroupFeatureType - isSameType - compare grouping features by type', () => {
    let GFT = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [testGenderFeature])

    let GFTSuccess = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)])
    expect(GFT.isSameType(GFTSuccess)).toBeTruthy()

    let GFTFailed = new GroupFeatureType(Feature.types.number, Constants.LANG_GREEK, 'Number', [new Feature(Feature.types.number, 'dual', Constants.LANG_GREEK)])
    expect(GFT.isSameType(GFTFailed)).toBeFalsy()
  })

  it('5 GroupFeatureType - formsColumn, formsRow - defined get and set for _formsColumn, and the GFT could be formRow or formColumn', () => {
    let GFT = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [testGenderFeature])

    expect(GFT.formsColumn).toBeFalsy()
    expect(GFT.formsRow).toBeFalsy()

    GFT.formsColumn = true
    GFT.formsRow = true

    expect(GFT.formsColumn).toBeFalsy()
    expect(GFT.formsRow).toBeTruthy()

    GFT.formsColumn = true
    expect(GFT.formsColumn).toBeTruthy()
    expect(GFT.formsRow).toBeFalsy()
  })

  it('6 GroupFeatureType - getTitle returns title if it stores in GFT', () => {
    let GFT = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [testGenderFeature])

    expect(GFT.getTitle('masculine')).toEqual('masculine')
    expect(GFT.getTitle('feminine')).toEqual('feminine') // If does not have the value, works as pass-though

    let GFT2 = new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [new Feature(Feature.types.gender, ['masculine', 'femine'], Constants.LANG_GREEK)])

    expect(GFT2.getTitle('masculine')).toEqual('masculine')
    expect(GFT2.getTitle('feminine')).toEqual('feminine')
    expect(GFT2.getTitle('neuter')).toEqual('neuter')
  })
})
