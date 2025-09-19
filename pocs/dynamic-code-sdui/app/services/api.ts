const API_BASE_URL = 'http://localhost:8080';

export interface Page {
  name: string;
  code: string;
}

export class ApiService {
  static async fetchPage(pageName: string): Promise<Page> {
    try {
      console.log('Fetching page:', `${API_BASE_URL}/api/page/${pageName}`);
      const response = await fetch(`${API_BASE_URL}/api/page/${pageName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page: ${response.status}`);
      }

      const page: Page = await response.json();
      console.log('Fetched page:', page.name, 'Code length:', page.code.length);
      return page;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }
}