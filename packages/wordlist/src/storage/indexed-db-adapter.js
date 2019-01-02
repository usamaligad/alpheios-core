import StorageAdapter from '@/storage/storage-adapter.js'

/**
 * An implementation of a StorageAdapter interface for a local storage.
 */
export default class IndexedDBAdapter extends StorageAdapter {
  
  constructor (domain = 'alpheios-storage-domain') {
    super(domain)

    this.available = this.initIndexedDBNamespaces()
    this.currentVersion = 1
    this.dbName = 'AlpheiosUserWordLists'
  }

  initIndexedDBNamespaces () {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!this.indexedDB) {
      console.info("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return false
    }
    return true
  }

  openDatabase (upgradeCallback, successCallback) {
    console.info('***********************openDatabase')
    let request = this.indexedDB.open(this.dbName, this.currentVersion)
    request.onerror = (event) => {
      console.info('*************Some problems with opening LabirintOrders', event.target)
    }
    request.onsuccess = successCallback
    request.onupgradeneeded = upgradeCallback
    return request
  }

  set (db, objectStoreName, data, onCompleteF) {
    const transaction = db.transaction([objectStoreName], 'readwrite')
    transaction.oncomplete = (event) => {
      console.info('**************set data successfull')
      if (onCompleteF) {
        onCompleteF()
      }
    }
    transaction.onerror = (event) => {
        console.info('**************testData onerror')
    }
    const objectStore = transaction.objectStore(objectStoreName);
    data.forEach(dataItem => {
      console.info('********************put dataItem', dataItem)
      const requestPut = objectStore.put(dataItem)
      requestPut.onsuccess = (event) => {
        console.info('****************wordlist added successful', event.target.result)
      }
      requestPut.onerror = (event) => {
        console.info('****************wordlist error with adding data', event.target)
      }
    })
  }

  get (db, objectStoreName, condition, callbackF) {
    const transaction = db.transaction([objectStoreName])
    const objectStore = transaction.objectStore(objectStoreName)

    if (this.hasProperCondition(condition)) {
      this.getWithCondition(objectStore, condition, callbackF)
    } else {
      console.info('There is not enough information for creating index condition')
      this.getWithoutConditions(objectStore, callbackF)
    }
  }

  hasProperCondition (condition) {
    const allowedTypes = [ 'only' ]
    return condition.indexName && condition.value && condition.type && allowedTypes.includes(condition.type)
  }

  getWithoutConditions (objectStore, callbackF) {
    const requestOpenCursor = objectStore.openCursor(null)
    requestOpenCursor.onsuccess = (event) => {
      callbackF(event.target.result)
    }
    requestOpenCursor.onerror = (event) => {
      console.info('****************cursor without condition - some error', event.target)
    }
  }

  getWithCondition (objectStore, condition, callbackF) {
    const index = objectStore.index(condition.indexName)
    const keyRange = this.IDBKeyRange[condition.type](condition.value)

    const requestOpenCursor = index.getAll(keyRange, 0)
    requestOpenCursor.onsuccess = (event) => {
      callbackF(event.target.result)
    }

    requestOpenCursor.onerror = (event) => {
      console.info('****************cursor with condition - some error', event.target)
    }
  }
}