import { FolderOutlined } from '@ant-design/icons';

export const navlinks = [
  {
    name: 'Quản lý sản phẩm',
    path: '/products',
    icon: <FolderOutlined />,
  },
];

export const authStorageKeys = {
  TOKEN: 'token',
  USER: 'user',
};

export const productCategoryList = [
  {
    display: 'Chai nhựa',
    category: 'chai-nhua',
  },
  {
    display: 'Ly nhựa',
    category: 'hop-dung-sua-chua',
  },
  {
    display: 'Hũ nhựa',
    category: 'hu-dung-lam-banh-flan',
  },
  {
    display: 'Túi, ống, hút, muỗng',
    category: 'hop-muong-ong-hut',
  },
];
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/';
