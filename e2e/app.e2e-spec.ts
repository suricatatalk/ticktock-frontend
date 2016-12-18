import { TicktockPage } from './app.po';

describe('ticktock App', function() {
  let page: TicktockPage;

  beforeEach(() => {
    page = new TicktockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
