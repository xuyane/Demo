import {addClass, removeClass} from '../dom';

export default class GlModal {
  constructor(overly, modal) {
    this.overlayEl = overly;
    this.modalEl = modal;
  }

  show() {
    addClass(this.overlayEl, 'active');
    addClass(this.modalEl, 'active');
    console.log('show class2');
  }

  close() {
    removeClass(this.overlayEl, 'active');
    removeClass(this.modalEl, 'active');
    console.log('close class2');
  }
}
