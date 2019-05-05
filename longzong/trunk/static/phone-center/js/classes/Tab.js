export default class GlTabs {
  constructor(tabBars, tabLine, tabContentWarp) {
    this.tabBars = tabBars;
    this.tabLine = tabLine;
    this.tabContentWarp = tabContentWarp;
    this.currentIndex = 0;
  }
  changeTab(target, cb) {
    const index = $(target).index();
    if (index === this.currentIndex) return;
    $(this.tabBars).eq(this.currentIndex).removeClass('active');
    this.currentIndex = index;
    $(this.tabBars).eq(this.currentIndex).addClass('active');
    $(this.tabLine).css('left', index * $(target).width() + 'px');
    $(this.tabContentWarp).css('transform', `translateX(${-index * 100}%)`);
    if (cb) cb(this.currentIndex);
  }
}
