// Classic Matomo Tracker (piwik.php) - No container needed
// Based on: https://matomo.org/faq/new-to-piwik/how-do-i-start-tracking-data-with-matomo-on-websites-that-use-react/

export interface MatomoTracker {
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
  const _paq = (window._paq = window._paq || []);

  // Always create the tracker instance so event tracking works in production
  // even if VITE_MATOMO_ENABLED is not explicitly set
  trackerInstance = {
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
