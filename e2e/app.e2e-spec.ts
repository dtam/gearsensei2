import { Gearsensei2Page } from './app.po';

describe('gearsensei2 App', function() {
  let page: Gearsensei2Page;

  beforeEach(() => {
    page = new Gearsensei2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
