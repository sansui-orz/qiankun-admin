export interface RuleItem {
  id: number;
  name: string;
  menus: Array<{ value: number; name: string }>;
  buttons: Array<{ value: number; name: string }>;
}

export interface MenuItem {
  key: number;
  id: number;
  name: string;
  count: number;
  menus: Array<{
    id: number;
    name: string;
    level: number;
    hidden: boolean;
    status: string;
    sort: number;
    url: string;
  }>;
}

export interface AccountItem {
  id: number;
  name: string;
  email: string;
  rules: Array<{ value: string; name: string }>;
  status: string;
}
