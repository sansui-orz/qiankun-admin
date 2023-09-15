export interface PanelData {
  conversionRate?: number[];
  notice?: Array<{
    id: string;
    desc: string;
    publicTime: string;
  }>;
  origin?: Array<{
    name: string;
    value: number;
  }>;
  records?: Array<{
    id: string;
    desc: string;
  }>;
  sale?: number[];
  todoList?: Array<{
    desc: string;
    id: string;
    todo: {
      text: string;
      url: string;
    };
  }>;
  uv?: number;
  store?: Array<{ name: string; value: string }>;
}
