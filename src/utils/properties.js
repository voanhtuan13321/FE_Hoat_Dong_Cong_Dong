import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

export const routers = [
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
