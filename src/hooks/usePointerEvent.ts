import { useEffect, useRef } from "react";

export function usePointerEvent() {
  const pointerEvent = useRef<PointerEvent>();

  const listener = (event: PointerEvent) => {
    pointerEvent.current = event;
  };

  useEffect(() => {
    const eventTypes = [
      "pointerover",
      "pointerenter",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointercancel",
      "pointerout",
      "pointerleave",
      "gotpointercapture",
      "lostpointercapture",
    ] as const;

    eventTypes.forEach((eventType) => document.addEventListener(eventType, listener));

    return () => {
      eventTypes.forEach((eventType) => document.removeEventListener(eventType, listener));
    };
  });

  return { pointerEvent };
}
