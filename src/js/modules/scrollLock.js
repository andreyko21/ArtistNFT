export default class ScrollLock {
  constructor() {
    this.lockPaddingElements = document.querySelectorAll('.lock-padding');
    this.body = document.body;
    this.html = document.documentElement;
  }

  toggleBodyLock(isLock) {
    const lockPaddingValue = window.innerWidth - this.html.offsetWidth;

    this.html.style.overflow = isLock ? 'hidden' : '';
    this.body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '';

    this.lockPaddingElements.forEach((element) => {
      element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '';
    });
  }
}
