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
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  }

  async function getFile(id) {
    const db = await openDb();
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  }

  async function deleteFile(id) {
    try {
      const db = await openDb();
      await new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).delete(id);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    } catch (e) {}
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

  function compressImageFile(file, maxW, quality) {
    return new Promise(function (resolve) {
      const img = new Image();
      const obj = URL.createObjectURL(file);
      img.onload = function () {
        const scale = Math.min(1, (maxW || 720) / (img.width || maxW || 720));
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(obj);
        resolve(c.toDataURL('image/jpeg', quality || 0.82));
      };
      img.onerror = function () {
        URL.revokeObjectURL(obj);
        resolve('');
      };
      img.src = obj;
    });
  }

  return { putFile, getFile, deleteFile, resolveUrl, compressImageFile };
})();
