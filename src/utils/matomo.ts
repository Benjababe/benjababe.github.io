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

// Track only in production builds
const IS_TRACKING = import.meta.env.VITE_MATOMO_ENABLED === 'true';

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

  if (!IS_TRACKING) return;

  trackerInstance = {
    trackPageView() {
      // Skip tracking for localhost (CI/Lighthouse internal servers)
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      ) {
        return;
      }

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
      // Matomo events: [category, action, name, value]
      if (name !== undefined && value !== undefined) {
        _paq.push(['trackEvent', category, action, name, value]);
      } else if (name !== undefined) {
        _paq.push(['trackEvent', category, action, name]);
      } else {
        _paq.push(['trackEvent', category, action]);
      }
    },
  };

  // Track initial page view
  trackerInstance.trackPageView();
}

export function getTracker(): MatomoTracker | null {
  return trackerInstance;
}
