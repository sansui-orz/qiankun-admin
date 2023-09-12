export type MenuItem = {
  name: string;
  url: string;
  children?: MenuItem[];
}

export type UserInfo = {
  account: string;
  avatar: string;
  username: string;
}

export interface ConfigResponse {
  userInfo: UserInfo;
  rules: {
    menus: Array<MenuItem>
  }
}