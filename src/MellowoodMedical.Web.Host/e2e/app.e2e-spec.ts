import { MellowoodMedicalTemplatePage } from './app.po';

describe('MellowoodMedical App', function() {
  let page: MellowoodMedicalTemplatePage;

  beforeEach(() => {
    page = new MellowoodMedicalTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
