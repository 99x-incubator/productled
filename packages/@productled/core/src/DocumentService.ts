export class DocumentService {
    getElementById(id: string): HTMLElement | null {
      return document.getElementById(id);
    }
  
    querySelector(selector: string): Element | null {
      return document.querySelector(selector);
    }
  }

  export default DocumentService;