/**
 * Tracking events are grouped by path names. By default, the path name where
 * an event is tracked is added to the event's properties. This means general
 * events can be tracked anywhere, but can still be identified uniquely. You can
 * change this behavior by passing a valid `identifyPath` option when calling
 * the `track` function.
 * */
const EVENTS = {
  general: {
    appPathChanged: 'app path changed',
  },
};

export default EVENTS;
