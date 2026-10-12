/**
 * JK Study Hub - Real-Time Visitor Analytics & Intent Engine
 * Tracks genuine page views, product clicks, study downloads, and student search demands.
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'jk_analytics_v2';
  const RESET_TIMESTAMP_KEY = 'jk_analytics_reset_timestamp';

  const JKAnalytics = {
    getStorage: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefaultData();
        const data = JSON.parse(raw);
        return {
          totalViews: Number(data.totalViews || 0),
          totalClicks: Number(data.totalClicks || 0),
          totalDownloads: Number(data.totalDownloads || 0),
          totalOrders: Number(data.totalOrders || 0),
          pageViews: data.pageViews || {},
          productClicks: data.productClicks || {},
          downloads: Array.isArray(data.downloads) ? data.downloads : [],
          searches: Array.isArray(data.searches) ? data.searches : [],
          activityLog: Array.isArray(data.activityLog) ? data.activityLog : []
        };
      } catch (e) {
        return this.getDefaultData();
      }
    },

    saveStorage: function(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {}

      // Optional sync with Firebase Firestore if available
      try {
        if (typeof firebase !== 'undefined' && firebase.firestore && firebase.apps && firebase.apps.length) {
          const db = firebase.firestore();
          // Update high-level summary silently
          db.collection('site_analytics').doc('summary').set({
            totalViews: data.totalViews,
            totalClicks: data.totalClicks,
            totalDownloads: data.totalDownloads,
            totalOrders: data.totalOrders,
            updatedAt: Date.now()
          }, { merge: true }).catch(() => {});
        }
      } catch (e) {}
    },

    getDefaultData: function() {
      return {
        totalViews: 0,
        totalClicks: 0,
        totalDownloads: 0,
        totalOrders: 0,
        pageViews: {},
        productClicks: {},
        downloads: [],
        searches: [],
        activityLog: []
      };
    },

    getDeviceType: function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    },

    addActivity: function(data, type, icon, label, meta) {
      if (!Array.isArray(data.activityLog)) data.activityLog = [];
      data.activityLog.unshift({
        type: type,
        icon: icon,
        label: label,
        meta: meta || '',
        device: this.getDeviceType(),
        timestamp: Date.now()
      });
      if (data.activityLog.length > 50) {
        data.activityLog = data.activityLog.slice(0, 50);
      }
    },

    trackView: function(pageName) {
      const page = pageName || (window.location.pathname.split('/').pop() || 'Home');
      const data = this.getStorage();
      data.totalViews += 1;
      data.pageViews[page] = (data.pageViews[page] || 0) + 1;

      this.addActivity(data, 'view', 'fa-eye', `Visited ${page}`, this.getDeviceType());
      this.saveStorage(data);
    },

    trackClick: function(itemName, actionType, category) {
      if (!itemName) return;
      const data = this.getStorage();
      data.totalClicks += 1;

      const pKey = String(itemName).trim();
      if (!data.productClicks[pKey]) {
        data.productClicks[pKey] = {
          name: pKey,
          clicks: 0,
          views: 0,
          category: category || 'General',
          lastAction: actionType || 'click',
          updatedAt: Date.now()
        };
      }
      data.productClicks[pKey].clicks += 1;
      data.productClicks[pKey].lastAction = actionType || 'click';
      data.productClicks[pKey].updatedAt = Date.now();

      this.addActivity(data, 'click', 'fa-arrow-pointer', `${actionType || 'Clicked'}: ${pKey}`, category || '');
      this.saveStorage(data);
    },

    trackProductImpression: function(itemName, category) {
      if (!itemName) return;
      const data = this.getStorage();
      const pKey = String(itemName).trim();
      if (!data.productClicks[pKey]) {
        data.productClicks[pKey] = {
          name: pKey,
          clicks: 0,
          views: 0,
          category: category || 'General',
          lastAction: 'view',
          updatedAt: Date.now()
        };
      }
      data.productClicks[pKey].views += 1;
      this.saveStorage(data);
    },

    trackDownload: function(title, category, fileUrl) {
      if (!title) return;
      const data = this.getStorage();
      data.totalDownloads += 1;

      const cleanTitle = String(title).trim();
      const existing = data.downloads.find(d => d.title.toLowerCase() === cleanTitle.toLowerCase());
      if (existing) {
        existing.count += 1;
        existing.timestamp = Date.now();
      } else {
        data.downloads.unshift({
          title: cleanTitle,
          category: category || 'Study Material',
          url: fileUrl || '',
          count: 1,
          timestamp: Date.now()
        });
      }

      this.addActivity(data, 'download', 'fa-download', `Downloaded ${cleanTitle}`, category || 'PDF');
      this.saveStorage(data);
    },

    trackSearch: function(query, resultsCount) {
      const q = String(query || '').trim();
      if (!q || q.length < 2) return;
      const data = this.getStorage();

      const existing = data.searches.find(s => s.query.toLowerCase() === q.toLowerCase());
      if (existing) {
        existing.count += 1;
        existing.resultsCount = (typeof resultsCount === 'number') ? resultsCount : existing.resultsCount;
        existing.timestamp = Date.now();
      } else {
        data.searches.unshift({
          query: q,
          count: 1,
          resultsCount: (typeof resultsCount === 'number') ? resultsCount : 0,
          timestamp: Date.now()
        });
      }

      const statusTag = resultsCount === 0 ? ' (Zero Results - Unmet Demand)' : '';
      this.addActivity(data, 'search', 'fa-magnifying-glass', `Searched "${q}"${statusTag}`, `${resultsCount || 0} found`);
      this.saveStorage(data);
    },

    trackOrder: function(orderId, amount, product) {
      const data = this.getStorage();
      data.totalOrders += 1;
      this.addActivity(data, 'order', 'fa-bag-shopping', `Order Placed: ${orderId || 'New Order'} (₹${amount || 0})`, product || 'Books');
      this.saveStorage(data);
    },

    getData: function() {
      return this.getStorage();
    },

    reset: function() {
      const zeroData = this.getDefaultData();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(zeroData));
        localStorage.setItem(RESET_TIMESTAMP_KEY, String(Date.now()));
      } catch (e) {}

      // Reset in cloud if firestore is connected
      try {
        if (typeof firebase !== 'undefined' && firebase.firestore && firebase.apps && firebase.apps.length) {
          const db = firebase.firestore();
          db.collection('site_analytics').doc('summary').set({
            totalViews: 0,
            totalClicks: 0,
            totalDownloads: 0,
            totalOrders: 0,
            resetAt: Date.now(),
            updatedAt: Date.now()
          }).catch(() => {});
        }
      } catch (e) {}

      return zeroData;
    },

    init: function() {
      // Auto-detect page and record view once per page session
      try {
        const sessionKey = 'jk_view_logged_' + window.location.pathname;
        if (!sessionStorage.getItem(sessionKey)) {
          let pName = 'Home';
          const path = window.location.pathname.toLowerCase();
          if (path.includes('store.html')) pName = 'Book Store';
          else if (path.includes('cart.html')) pName = 'Shopping Cart';
          else if (path.includes('account.html')) pName = 'Student Account';
          else if (path.includes('seller.html')) pName = 'Seller Hub';
          else if (path.includes('pyqs')) pName = 'PYQs Portal';
          else if (path.includes('model-papers')) pName = 'Model Papers';
          else if (path.includes('privacy')) pName = 'Privacy Policy';
          else if (path.includes('refund')) pName = 'Refund Terms';
          else pName = 'Home Page';

          this.trackView(pName);
          sessionStorage.setItem(sessionKey, 'true');
        }
      } catch (e) {
        this.trackView('Website');
      }
    }
  };

  window.JKAnalytics = JKAnalytics;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => JKAnalytics.init());
  } else {
    JKAnalytics.init();
  }
})();
