import Home from '../pages/home'
import Login from '../pages/login'
import NotFound from '../pages/not_found'

export const routers = [
  {
    path: '/',
    label: 'trang chủ',
    element: <Home />,
    roles: [
      'client',
      'sinh-vien',
      'lop-truong',
      'giao-vien',
      'truong-khoa',
      'admin',
    ],
    onClick: navigator => navigator(this.path),
  },
  {
    path: '/home',
    label: 'trang chủ',
    element: <Home />,
    roles: [
      'client',
      'sinh-vien',
      'lop-truong',
      'giao-vien',
      'truong-khoa',
      'admin',
    ],
    onClick: navigator => navigator(this.path),
  },
  {
    path: '/login',
    label: 'đăng nhập',
    element: <Login />,
    roles: ['client'],
    onClick: navigator => navigator(this.path),
  },
  {
    label: 'đăng xuất',
    roles: ['sinh-vien', 'lop-truong', 'giao-vien', 'truong-khoa', 'admin'],
    onClick: () => {
      // handle logout here
    },
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]
