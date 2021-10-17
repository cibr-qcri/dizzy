export const SEARCH_FILTER_ANY = {
  type: 'any',
  label: 'Any',
};

export const SEARCH_FILTER = {
  categories: [
    SEARCH_FILTER_ANY,
    { type: 'crypto-service', label: 'Crypto service' },
    { type: 'index', label: 'Index or link list' },
    { type: 'marketplace', label: 'Marketplace' },
    { type: 'pornography', label: 'Pornography' },
    { type: 'forum', label: 'Forum' },
    { type: 'other', label: 'Other' },
  ],
  cryptos: [
    SEARCH_FILTER_ANY,
    { type: 'btc', label: 'Bitcoin' },
    { type: 'none', label: 'None' },
  ],
  security: [
    SEARCH_FILTER_ANY,
    { type: 'benign', label: 'Benign' },
    { type: 'malicious', label: 'Malicious' },
  ],
  privacy: [
    SEARCH_FILTER_ANY,
    { type: 'tracking', label: 'Tracked' },
    { type: 'no-tracking', label: 'No tracked' },
  ],
  status: [
    SEARCH_FILTER_ANY,
    { type: 'online', label: 'Online' },
    { type: 'offline', label: 'Offline' },
  ],
  mirroring: [
    SEARCH_FILTER_ANY,
    { type: 'mirrored', label: 'Mirrored' },
    { type: 'unique', label: 'Not mirrored' },
  ],
  language: [
    SEARCH_FILTER_ANY,
    { type: 'ar', label: 'Arabic' },
    { type: 'en', label: 'English' },
    { type: 'fr', label: 'French' },
    { type: 'de', label: 'German' },
    { type: 'ru', label: 'Russian' },
    { type: 'es', label: 'Spanish' },
  ],
};
