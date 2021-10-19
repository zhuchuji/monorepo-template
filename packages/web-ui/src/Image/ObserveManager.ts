interface Target {
  element: Element;
  onIntersect: () => void;
}

class ObserveManager {
  static manager: ObserveManager;

  private intersectionObserver: IntersectionObserver;
  private targetMap: Map<Element, () => void>;

  constructor() {
    this.intersectionObserver = new IntersectionObserver(
      // @ts-ignore ts bug, see https://github.com/microsoft/TypeScript/issues/21309
      (entries) => window.requestIdleCallback(() => this.callback(entries)),
      {
        threshold: 0.2,
      },
    );
    this.targetMap = new Map();
  }

  static getInstance() {
    if (ObserveManager.manager === undefined) {
      ObserveManager.manager = new ObserveManager();
    }
    return ObserveManager.manager;
  }

  private callback(entries: IntersectionObserverEntry[]) {
    for (const entry of entries.filter((entry) => entry.isIntersecting)) {
      if (this.targetMap.has(entry.target)) {
        const onIntersect = this.targetMap.get(entry.target);
        if (onIntersect !== undefined) {
          onIntersect();
        }
        this.unobserve(entry.target);
      }
    }
  }

  public observe({ element, onIntersect }: Target) {
    if (!this.targetMap.has(element)) {
      this.intersectionObserver.observe(element);
      this.targetMap.set(element, onIntersect);
    }
  }

  public unobserve(element: Element) {
    if (this.targetMap.has(element)) {
      this.intersectionObserver.unobserve(element);
      this.targetMap.delete(element);
    }
  }
}

export default ObserveManager;
