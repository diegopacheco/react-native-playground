const API_BASE_URL = 'http://localhost:8080';

export interface Component {
  type: string;
  props?: { [key: string]: any };
  children?: Component[];
  text?: string;
  actions?: { [key: string]: string };
}

export interface Page {
  name: string;
  components: Component[];
}

export class ApiService {
  static async fetchPage(pageName: string): Promise<Page> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/page/${pageName}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch page: ${response.status}`);
      }

      const page: Page = await response.json();
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }
}