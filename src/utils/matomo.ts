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
  // @ts-expect-error _paq is a global array defined by matomo.js
  const _paq = (window._paq = window._paq || []);

  _paq.push(['setTrackerUrl', `${trackerUrl}/piwik.php`]);
  _paq.push(['setSiteId', siteId.toString()]);

  // Enable link tracking (file downloads, outbound clicks)
  _paq.push(['enableLinkTracking']);

  // Always create the tracker instance so event tracking works in production
  // even if VITE_MATOMO_ENABLED is not explicitly set
  trackerInstance = {
    trackPageView() {
      const url = `${window.location.pathname}#${window.scrollY}`;
      _paq.push(['setCustomUrl', url]);
      _paq.push(['trackPageView']);
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
        _paq.push(['trackEvent', category, action, name, value]);
      } else if (name !== undefined) {
        _paq.push(['trackEvent', category, action, name]);
      } else {
        // Fallback: push at least [category, action] which Matomo accepts
        _paq.push(['trackEvent', category, action]);
      }
    },
  };

  // Track initial page view (only on non-localhost)
  if (
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    const url = `${window.location.pathname}#${window.scrollY}`;
    _paq.push(['setCustomUrl', url]);
    _paq.push(['trackPageView']);
  }

  // Dev logging to help debug tracking issues
  if (import.meta.env.DEV) {
    console.info('[Matomo] Initialized | trackerUrl:', trackerUrl, '| siteId:', siteId);
    console.info('[Matomo] IS_TRACKING:', IS_TRACKING);
    console.info('[Matomo] _paq queue size:', _paq.length);
  }
}

export function getTracker(): MatomoTracker | null {
  return trackerInstance;
}
