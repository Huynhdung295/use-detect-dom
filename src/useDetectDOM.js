import { useState, useEffect } from 'react';
import _ from 'lodash';

/**
 * @callback DOMDetectCallback
 * @param {boolean} exists
 */

/**
 * @typedef {Object} DOMDetectListener
 * @property {string} selector
 * @property {DOMDetectCallback} callback
 */

/**
 * @param {Element|Document} target 
 * @param {string} selector 
 * @returns {boolean}
 */
function safeQuerySelector(target, selector) {
  try {
    return !!target.querySelector(selector);
  } catch (e) {
    return !e;
  }
}

const observerManager = {
  /** @type {MutationObserver|null} */
  observer: null,
  /** @type {Array.<DOMDetectListener>} */
  listeners: [],
  /** @type {Object.<string, boolean>} */
  stateCache: {},

  /**
   * @param {string} selector 
   * @param {DOMDetectCallback} callback 
   * @returns {void}
   */
  subscribe(selector, callback) {
    this.listeners.push({ selector: selector, callback: callback });

    if (!this.observer) {
      const targetNode = document.body;
      const MutationObserverClass = window.MutationObserver;

      this.observer = new MutationObserverClass((mutations) => {
        const hasNodeChanges = mutations.some((mutation) => {
          const addedCount = _.get(mutation, 'addedNodes.length', 0);
          const removedCount = _.get(mutation, 'removedNodes.length', 0);
          return addedCount > 0 || removedCount > 0;
        });

        if (!hasNodeChanges) return;

        const length = this.listeners.length;
        /** @type {Object.<string, boolean>} */
        const tempCache = {};

        for (let i = 0; i < length; i++) {
          const listener = this.listeners[i];
          const selectorStr = listener.selector;

          if (tempCache[selectorStr] === undefined) {
            tempCache[selectorStr] = safeQuerySelector(targetNode, selectorStr);
          }

          const exists = tempCache[selectorStr];
          
          if (this.stateCache[selectorStr] !== exists) {
            listener.callback(exists);
          }
        }
        
        this.stateCache = tempCache;
      });

      this.observer.observe(targetNode, {
        childList: true,
        subtree: true
      });
    }
  },

  /**
   * @param {string} selector 
   * @param {DOMDetectCallback} callback 
   * @returns {void}
   */
  unsubscribe(selector, callback) {
    this.listeners = _.filter(this.listeners, (item) => {
      return item.selector !== selector || item.callback !== callback;
    });

    if (_.isEmpty(this.listeners) && this.observer) {
      this.observer.disconnect();
      this.observer = null;
      this.stateCache = {};
    }
  }
};

/**
 * @param {string} selector
 * @returns {boolean}
 */
export function useDetectDOM(selector) {
  const [prevSelector, setPrevSelector] = useState(selector);
  const [exists, setExists] = useState(() => {
    if (_.isEmpty(selector)) return false;
    return !!safeQuerySelector(document.body, selector);
  });

  if (selector !== prevSelector) {
    setPrevSelector(selector);
    setExists(_.isEmpty(selector) ? false : !!safeQuerySelector(document.body, selector));
  }

  useEffect(() => {
    if (_.isEmpty(selector)) return;

    const handleDOMChange = (isPresent) => {
      setExists(isPresent);
    };

    observerManager.subscribe(selector, handleDOMChange);

    return () => {
      observerManager.unsubscribe(selector, handleDOMChange);
    };
  }, [selector]);

  return exists;
}