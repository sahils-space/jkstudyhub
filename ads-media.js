/* Shared store + seller media helper: IndexedDB for videos, compressed photos. */
window.AdsMedia = (function () {
  const DB_NAME = 'jk_study_hub_ads';
  const STORE = 'media';
  const blobCache = {};

  function openDb() {
    return new Promise(function (resolve, reject) {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains(STORE)) {
          req.result.createObjectStore(STORE);
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  async function putFile(id, blob) {
    const db = await openDb();
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(blob, id);
      tx.oncomplete = function () {
        db.close();
        resolve();
      };
      tx.onerror = function () {
        db.close();
        reject(tx.error);
      };
      tx.onabort = function () {
        db.close();
        reject(tx.error || new Error('Could not save the media file.'));
      };
    });
  }

  async function getFile(id) {
    const db = await openDb();
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
      tx.oncomplete = function () { db.close(); };
      tx.onerror = function () { db.close(); };
    });
  }

  async function deleteFile(id) {
    const db = await openDb();
    await new Promise(function (resolve, reject) {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = function () {
        db.close();
        resolve();
      };
      tx.onerror = function () {
        db.close();
        reject(tx.error);
      };
      tx.onabort = function () {
        db.close();
        reject(tx.error || new Error('Could not remove the media file.'));
      };
    });
    if (blobCache[id]) {
      try { URL.revokeObjectURL(blobCache[id]); } catch (e) {}
      delete blobCache[id];
    }
  }

  async function resolveUrl(url) {
    if (!url) return '';
    if (url.indexOf('idb:') === 0) {
      const id = url.slice(4);
      if (blobCache[id]) return blobCache[id];
      const file = await getFile(id);
      if (!file) return '';
      blobCache[id] = URL.createObjectURL(file);
      return blobCache[id];
    }
    if (url.indexOf('blob:') === 0) return '';
    return url;
  }

  return { putFile, getFile, deleteFile, resolveUrl };
})();
