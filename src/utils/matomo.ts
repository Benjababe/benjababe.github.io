// Classic Matomo Tracker (piwik.php) - No container needed
// Based on: https://matomo.org/faq/new-to-piwik/how-do-i-start-tracking-data-with-matomo-on-websites-that-use-react/

export interface MatomoTracker {
  trackPageView(): void;
  trackEvent(
    category: string,
    action: string,
    name?: string,
    value?: number,
  ): void;
}

let trackerInstance: MatomoTracker | null = null;

// Determine if tracking is enabled (production or explicitly enabled)
const IS_TRACKING =
  import.meta.env.VITE_MATOMO_ENABLED === 'true' ||
  !/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

/**
 * Initialize the classic Matomo tracker.
 * Call this once at app startup.
 */
export function initMatomo(trackerUrl: string, siteId: number): void {
  // @ts-expect-error _paq is a global array/object defined by matomo.js
  const _paq = window._paq;

  // Capture the push function once at init time so event tracking methods
  // always use the correct reference, even if _paq gets replaced later.
  let pushToPaq: (command: unknown[]) => void;

  if (!_paq) {
    // matomo.js hasn't loaded yet — create _paq so our pushes are queued
    window._paq = [];
    // @ts-expect-error _paq is a global array defined by matomo.js
    pushToPaq = (window._paq as Array<unknown[]>).push.bind(window._paq) as (
      command: unknown[],
    ) => void;
    window._paq.push(['setTrackerUrl', `${trackerUrl}/piwik.php`]);
    window._paq.push(['setSiteId', siteId.toString()]);
    window._paq.push(['enableLinkTracking']);
  } else if (
    typeof _paq.push === 'function' &&
    _paq.push.toString().includes('[native code]')
  ) {
    // _paq is a plain array (matomo.js loaded but hasn't replaced it yet)
    // — push directly and matomo will process our commands.
    pushToPaq = _paq.push.bind(_paq) as (command: unknown[]) => void;
    pushToPaq(['setTrackerUrl', `${trackerUrl}/piwik.php`]);
    pushToPaq(['setSiteId', siteId.toString()]);
    pushToPaq(['enableLinkTracking']);
  } else {
    // matomo.js has replaced _paq with an object containing a tracker.
    // Use addTracker() to register with the active tracker, and capture
    // _paq.push for our custom tracker methods (it's matomo's internal push).
    const trackerUrlPath = `${trackerUrl}/piwik.php`;
    if (
      typeof window.Matomo === 'object' &&
      typeof window.Matomo.addTracker === 'function'
    ) {
      window.Matomo.addTracker(trackerUrlPath);
    }
    // @ts-expect-error _paq is a global object defined by matomo.js
    pushToPaq = (window._paq as { push: (cmd: unknown[]) => void }).push.bind(
      // @ts-expect-error _paq is a global object defined by matomo.js
      window._paq,
    );
  }

  // Always create the tracker instance so event tracking works in production
  // even if VITE_MATOMO_ENABLED is not explicitly set
  trackerInstance = {
    trackPageView() {
      const url = `${window.location.pathname}#${window.scrollY}`;
      pushToPaq(['setCustomUrl', url]);
      pushToPaq(['trackPageView']);
    },
    trackEvent(
      category: string,
      action: string,
      name?: string,
      value?: number,
    ) {
      // Matomo event format: [category, action, name?, value?]
      // At minimum, category and action are required.
      if (name !== undefined && value !== undefined) {
        pushToPaq(['trackEvent', category, action, name, value]);
      } else if (name !== undefined) {
        pushToPaq(['trackEvent', category, action, name]);
      } else {
        // Fallback: push at least [category, action] which Matomo accepts
        pushToPaq(['trackEvent', category, action]);
      }
    },
  };

  // Track initial page view (only on non-localhost)
  if (
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    const url = `${window.location.pathname}#${window.scrollY}`;
    pushToPaq(['setCustomUrl', url]);
    pushToPaq(['trackPageView']);
  }

  // Dev logging to help debug tracking issues
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(
      '[Matomo] Initialized | trackerUrl:',
      trackerUrl,
      '| siteId:',
      siteId,
    );
    // eslint-disable-next-line no-console
    console.info('[Matomo] IS_TRACKING:', IS_TRACKING);
  }
}

export function getTracker(): MatomoTracker | null {
  return trackerInstance;
}
