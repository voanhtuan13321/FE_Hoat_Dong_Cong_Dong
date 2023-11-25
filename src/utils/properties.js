import { setRole } from '../redux/storeSlice'
import Home from '../pages/home'
import Login from '../pages/login'
import NotFound from '../pages/not_found'
import ThongTinCaNhan from '../pages/thong_tin_ca_nhan'
import TuDanhGia from '../pages/tu_danh_gia'
import DanhSachLop from '../pages/danh_sach_lop'
import KetQuaPhucVuCongDong from '../pages/ket_qua_phuc_vu_cong_dong'
import HoatDongCongDongCuaKhoa from '../pages/hoat_dong_cong_dong_cua_khoa'
import AdminDanhSachKhoa from '../pages/admin_danh_sach_khoa'
import AdminDanhSachLop from '../pages/admin_danh_sach_lop'
import AdminDanhSachThongBao from '../pages/admin_danh_sach_thong_bao'
import AdminDanhSachGiaoVien from '../pages/admin_danh_sach_giao_vien'
import AdminDanhSachSinhVien from '../pages/admin_danh_sach_sinh_vien'
import AdminDanhSachHoatDongCongDong from '../pages/admin_danh_sach_hoat_dong_cong_dong'
import AdminHoatDongCongDongCuaTruong from '../pages/admin_hoat_dong_cong_dong_cua_truong'

export const ROLES = {
  client: 1,
  sinhVien: 2,
  lopTruong: 3,
  giaoVien: 4,
  truongKhoa: 5,
  admin: 6,
}

export const routers = [
  {
    path: '/',
    label: 'trang chủ',
    element: <Home />,
    roles: [
      ROLES.client,
      ROLES.sinhVien,
      ROLES.lopTruong,
      ROLES.giaoVien,
      ROLES.truongKhoa,
      ROLES.admin,
    ],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/login',
    label: 'đăng nhập',
    element: <Login />,
    roles: [ROLES.client],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/thong-tin-ca-nhan',
    label: 'thông tin cá nhân',
    element: <ThongTinCaNhan />,
    roles: [ROLES.sinhVien, ROLES.lopTruong, ROLES.giaoVien, ROLES.truongKhoa],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/tu-danh-gia',
    label: 'tự đánh giá',
    element: <TuDanhGia />,
    roles: [ROLES.sinhVien, ROLES.lopTruong],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-lop',
    label: 'danh sách lớp',
    element: <DanhSachLop />,
    roles: [ROLES.sinhVien, ROLES.lopTruong, ROLES.giaoVien],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/ket-qua-phuc-vu-cong-dong',
    label: 'kết quả phục vụ cộng đồng',
    element: <KetQuaPhucVuCongDong />,
    roles: [ROLES.sinhVien, ROLES.lopTruong],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/hoat-dong-cong-dong-cua-khoa',
    label: 'hoạt động cồng đồng của khoa',
    element: <HoatDongCongDongCuaKhoa />,
    roles: [ROLES.truongKhoa],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-khoa-ad',
    label: 'danh sách khoa',
    element: <AdminDanhSachKhoa />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-lop-ad',
    label: 'danh sách lớp',
    element: <AdminDanhSachLop />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-thong-bao-ad',
    label: 'danh sách thông báo',
    element: <AdminDanhSachThongBao />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-giao-vien-ad',
    label: 'danh sách giáo viên',
    element: <AdminDanhSachGiaoVien />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-sinh-vien-ad',
    label: 'danh sách sinh viên',
    element: <AdminDanhSachSinhVien />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-hoat-dong-cong-dong-ad',
    label: 'danh sách hoạt động cộng đồng',
    element: <AdminDanhSachHoatDongCongDong />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/hoat-dong-cong-dong-cua-truong-ad',
    label: 'hoạt động cộng đồng của trường',
    element: <AdminHoatDongCongDongCuaTruong />,
    roles: [ROLES.admin],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    label: 'đăng xuất',
    roles: [
      ROLES.sinhVien,
      ROLES.lopTruong,
      ROLES.giaoVien,
      ROLES.truongKhoa,
      ROLES.admin,
    ],
    onClick: function (navigator, dispatch) {
      // handle logout here
      dispatch(setRole(ROLES.client))
      navigator('')
    },
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]
