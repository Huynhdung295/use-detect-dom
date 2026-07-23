# useDetectDOM

A performance-optimized React hook using a single global `MutationObserver` instance (Singleton Pattern) to detect the presence of DOM elements. It enables decoupled, peer-level components to synchronize and block each other's actions based purely on DOM selectors, bypassing prop-drilling or global state management.

---

## Sample Flow

The included sample simulates a 3-way blocking hierarchy among peer components:

```
[Popup A] --- (renders .block-popup-B) ---> Blocks [Popup B]
    |
    +-------- (renders .block-popup-2) -\
                                         ---> Blocks [Popup 2]
[Popup B] --- (renders .block-popup-2) -/
```

1. **Popup A** (when active) renders `.block-popup-2` and `.block-popup-B`.
   * Blocks both **Popup B** and **Popup 2**.
2. **Popup B** (when active) renders `.block-popup-2`.
   * Blocks **Popup 2**.
   * Is blocked by **Popup A** (listens to `.block-popup-B`).
3. **Popup 2** is only active when unblocked.
   * Is blocked by either **Popup A** or **Popup B** (listens to `.block-popup-2`).

---

## Technical Features

* **Single Observer Instance**: Evaluates multiple elements through a single subscription manager, avoiding DOM observation overhead.
* **Batch Evaluation**: Evaluates unique selectors once per DOM mutation tick using a temporary query cache.
* **Safe Queries**: Standard `querySelector` calls are guarded with exception handling to prevent runtime crashes from malformed inputs.
* **Zero-flicker Render Sync**: State updates are calculated during the render phase when the target selector changes, preventing cascading render loops.

---

## Quick Usage

```javascript
import { useDetectDOM } from './useDetectDOM';

function ActionButton() {
  const isBlocked = useDetectDOM('.block-popup-2');

  return (
    <button disabled={isBlocked}>
      {isBlocked ? 'Blocked' : 'Proceed'}
    </button>
  );
}
```