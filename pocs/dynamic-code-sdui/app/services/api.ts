const API_BASE_URL = 'http://localhost:8080';

export interface Component {
  type: string;
  props?: { [key: string]: any };
  children?: Component[];
  text?: string;
  actions?: { [key: string]: string };
  code?: string;
}

export interface Page {
  name: string;
  components: Component[];
  code?: string;
}

export class ApiService {
  static async fetchPage(pageName: string): Promise<Page> {
    try {
      console.log('Fetching page:', pageName);
      const response = await fetch(`${API_BASE_URL}/api/page/${pageName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page: ${response.status}`);
      }

      const page: Page = await response.json();
      console.log('Fetched page(first ~100 chars):', page.name, page.components.length, page.code ? page.code.substring(0, 100) + '...' : 'No code');
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }
}