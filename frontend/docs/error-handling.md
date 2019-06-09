## 💃Error Handling

### Error Boundary: 🧚‍ Avoid unexpected blank pages on your app!

You can use the component [`ErrorBoundary`](startproject/react/src/components/ErrorBoundary/ErrorBoundary.tsx) to display a fallback component when a Javascript error is caught in a children of the ErrorBoundary.

_[Reference documentation by React](https://reactjs.org/docs/error-boundaries.html)_

#### ✅ What to do if you want to use it on your project

The ErrorBoundary is wrapped by default around the main [`App`](startproject/react/src/App.tsx) and renders the [`AppCrashFallback`](startproject/react/src/components/AppCrashFallback/AppCrashFallback.tsx) for generic errors.

- Edit the [`AppCrashFallback`](startproject/react/src/components/AppCrashFallback/AppCrashFallback.tsx) to fit your design guidelines.
- Send error to your monitoring system using the `componentDidCatch` from the [`ErrorBoundary`](startproject/react/src/components/ErrorBoundary/ErrorBoundary.tsx).

#### 💡 Where to use

You can define fallbacks at lower levels for custom error handling.

Ex: You display a graph rendered by a certain lib. If this lib does not work on some browsers you can display a fallback instead. Wrapp the graph in an [`ErrorBoundary`](startproject/react/src/components/ErrorBoundary/ErrorBoundary.tsx) and choose the fallback to use instead by passing a `FallbackComponent` prop.
