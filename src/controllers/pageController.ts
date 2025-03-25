import type PageInterface from '@/interfaces/page';
import Page from '@/models/page';

class PageController {
  static async index(): Promise<PageInterface[]> {
    return await Page.all();
  }
  static async store(data: PageInterface): Promise<PageInterface> {
    return await Page.create(data);
  }
  static async show(id: string): Promise<PageInterface | null> {
    return await Page.find(id);
  }
  static async update(data: PageInterface, id: string): Promise<PageInterface> {
    return await Page.update(data, id);
  }
}

export default PageController;