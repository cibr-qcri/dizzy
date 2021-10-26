import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Amplitude from 'amplitude-js';
import EVENTS from '../../constants/analytics';

const __DEV__ = !(process.env.NODE_ENV === 'production');

const AnalyticsContext = React.createContext();

const getTrackingFunctions = (optionsRef) => {
  const amplitude = Amplitude.getInstance();

  const { devOptions } = optionsRef.current;
  const { logToTracker, logToConsole } = devOptions;

  /**
   *
   * @param {*} event Event to track.
   * @param {Object} properties - Event properties to track.
   * @param {('event'|'properties'|'both' | 'none')} identifyPath - Add path name to event, properties, both, or none.
   */
  const track = (event, properties, identifyPath = 'properties') => {
    const pathName = window.location.pathname.substring(1).toLowerCase();
    switch (identifyPath) {
      case 'event':
        event = `[${pathName}] ${event}`;
        break;
      case 'properties':
        properties = { ...properties, pathName };
        break;
      case 'both':
        event = `[${pathName}] ${event}`;
        properties = { ...properties, pathName };
        break;
      case 'none':
      default:
        break;
    }

    if (__DEV__) {
      if (logToTracker) {
        amplitude.logEvent(event, properties);
      }
      if (logToConsole) {
        console.info(
          `[analytics] Event '${event}' fired with props ${JSON.stringify(
            properties
          )}.`
        );
      }
    }
  };

  const identify = (properties) => {
    if (properties) {
      if (__DEV__) {
        if (logToTracker) {
          amplitude.setUserProperties(properties);
        }
        if (logToConsole) {
          console.log(
            `[analytics] Tracked user updated with props ${JSON.stringify(
              properties
            )}.`
          );
        }
      }
    }
  };

  const setUserId = (userId) => {
    if (__DEV__) {
      if (logToTracker) {
        amplitude.setUserId(userId);
      }
      if (logToConsole) {
        console.info(`[analytics] Tracking user with id ${userId}.`);
      }
    }
  };

  return { track, identify, setUserId };
};

const AnalyticsProvider = ({
  devOptions = {
    logToTracker: false,
    logToConsole: false,
  },
  children,
}) => {
  // Variables
  const optionsRef = useRef({ devOptions });
  const history = useHistory();
  const amplitude = Amplitude.getInstance();
  const { track, setUserId } = getTrackingFunctions(optionsRef);

  // Local State
  const [amplitudeIsInit, setAmplitudeIsInit] = useState(false);

  // Redux
  const userId = useSelector((state) => state.user.data._id);

  // Browser Utils
  const getBrowserVisibilityProp = useCallback(() => {
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      return 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      return 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      return 'webkitvisibilitychange';
    }
  }, []);

  const getBrowserDocumentHiddenProp = useCallback(() => {
    if (typeof document.hidden !== 'undefined') {
      return 'hidden';
    } else if (typeof document.msHidden !== 'undefined') {
      return 'msHidden';
    } else if (typeof document.webkitHidden !== 'undefined') {
      return 'webkitHidden';
    }
  }, []);

  const getIsDocumentHidden = useCallback(() => {
    return !document[getBrowserDocumentHiddenProp()];
  }, [getBrowserDocumentHiddenProp]);

  // Handlers
  const handleUserIdChanged = useCallback(
    async (userId) => {
      if (!userId) return;
      setUserId(userId);
    },
    [setUserId]
  );

  const handleVisibilityChanged = useCallback(() => {
    track(EVENTS.general.appVisibilityChanged, {
      isVisible: getIsDocumentHidden(),
    });
  }, [getIsDocumentHidden, track]);

  const handleFocusChanged = useCallback(() => {
    track(EVENTS.general.appFocusChanged, {
      isFocused: document.hasFocus(),
    });
  }, [track]);

  const handlePathChanged = useCallback(
    (location) => {
      track(
        EVENTS.general.appPathChanged,
        {
          pathName: location.pathname.substring(1).toLowerCase(),
          searchQuery: location.search,
        },
        'none'
      );
    },
    [track]
  );

  const handleInitializationSuccess = useCallback(() => {
    setAmplitudeIsInit(true);
  }, []);

  const initializeTracker = useCallback(async () => {
    amplitude.init(
      process.env.REACT_APP_AMPLITUDE_API_KEY,
      null,
      {
        includeReferrer: true,
        includeGclid: true,
        includeUtm: true,
      },
      handleInitializationSuccess
    );

    if (__DEV__) {
      if (optionsRef.current.devOptions.logToTracker) {
        if (optionsRef.current.devOptions.logToConsole) {
          console.info(
            `[analytics] Events are logged to tracker and console. ` +
              `Remember to use a dev API key!`
          );
        } else {
          console.info(
            `[analytics] Events are logged to tracker, not console. Remember to use a dev API key!`
          );
        }
      } else {
        if (optionsRef.current.devOptions.logToConsole) {
          console.info(
            `[analytics] Events are logged to console, not tracker.`
          );
        } else {
          console.info(
            `[analytics] Disabled for development. Note you can pass devOptions to AnalyticsProvider.`
          );
        }
      }
    }
  }, [amplitude, handleInitializationSuccess]);

  // Hooks
  useEffect(() => {
    initializeTracker();
  }, [amplitude, initializeTracker]);

  useEffect(() => {
    if (amplitudeIsInit) {
      const visibilityChange = getBrowserVisibilityProp();
      document.addEventListener(
        visibilityChange,
        handleVisibilityChanged,
        false
      );

      return () => {
        document.removeEventListener(visibilityChange, handleVisibilityChanged);
      };
    }
  }, [getBrowserVisibilityProp, handleVisibilityChanged, amplitudeIsInit]);

  useEffect(() => {
    if (amplitudeIsInit) {
      window.addEventListener('focus', handleFocusChanged, false);
      window.addEventListener('blur', handleFocusChanged, false);

      return () => {
        window.removeEventListener('focus', handleFocusChanged);
        window.removeEventListener('blur', handleFocusChanged);
      };
    }
  }, [handleFocusChanged, amplitudeIsInit]);

  useEffect(() => {
    if (amplitudeIsInit) {
      handleUserIdChanged(userId);
    }
  }, [handleUserIdChanged, amplitude, userId, amplitudeIsInit]);

  useEffect(() => {
    if (amplitudeIsInit) {
      const unregisterListener = history.listen(handlePathChanged);
      return unregisterListener;
    }
  }, [history, handlePathChanged, amplitudeIsInit]);

  return (
    <AnalyticsContext.Provider value={optionsRef}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const optionsRef = useContext(AnalyticsContext);

  const { track, identify } = getTrackingFunctions(optionsRef);

  return { events: EVENTS, track, identify };
};

export default AnalyticsProvider;
