// component
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

// functions
import { setRole } from '../redux/storeSlice'
import { localStorages } from './localStorage'
import AdminThoiGianXetDuyet from '../pages/admin_thoi_gian_xet_duyet'

export const ITEM_PER_PAGE = 10
export const KEY_ROLE_TOKEN =
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export const ROLES = {
  ANONYMOUS: 1,
  SINH_VIEN: 2,
  LOP_TRUONG: 3,
  GIAO_VIEN: 4,
  TRUONG_KHOA: 5,
  ADMIN: 6,
}

export const COMMUNITY_ACTIVITY_APPROVAL_PERIOD_STATUS = {
  RESTRICTED: 0,
  STUDENT: 1,
  CLASS_PRESIDENT: 2,
  HEAD_TEACHER: 3,
  MAJOR_HEAD: 4,
}

export const COMMUNITY_ACTIVITY_APPROVAL_PERIOD =
  'CommunityActivityApprovalPeriod'

export const REGEX = {
  TEXT_ONLY: /^[a-zA-ZÀ-Ỹà-ỹ ]+$/,
  DONT_SPACE: /^[a-zA-Z0-9_]+$/,
  PHONE_NUMBER: /^(?:\+84|0)(\d{9,10})$/,
  LINK: /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
}

export const COMMUNITY_ACTIVITY_STATUS = {
  REJECTED: -1,
  STUDENT_CONFIRMED: 1,
  CLASS_PRESIDENT_CONFIRMED: 2,
  HEAD_TEACHER_CONFIRMED: 3,
  MAJOR_HEAD_CONFIRMED: 4,
}

export const optionsGender = [
  { name: 'Nam', value: true },
  { name: 'Nữ', value: false },
]

export const STATUS_USER = {
  ACCOUNT_LOCKED: -1,
  ACCOUNT_UNLOCK: 0,
}

export const routers = [
  {
    path: '/',
    label: 'trang chủ',
    element: <Home />,
    roles: [
      ROLES.ANONYMOUS,
      ROLES.SINH_VIEN,
      ROLES.LOP_TRUONG,
      ROLES.GIAO_VIEN,
      ROLES.TRUONG_KHOA,
      ROLES.ADMIN,
    ],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/login',
    label: 'đăng nhập',
    element: <Login />,
    roles: [ROLES.ANONYMOUS],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/thong-tin-ca-nhan',
    label: 'thông tin cá nhân',
    element: <ThongTinCaNhan />,
    roles: [
      ROLES.SINH_VIEN,
      ROLES.LOP_TRUONG,
      ROLES.GIAO_VIEN,
      ROLES.TRUONG_KHOA,
    ],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/tu-danh-gia',
    label: 'tự đánh giá',
    element: <TuDanhGia />,
    roles: [ROLES.SINH_VIEN, ROLES.LOP_TRUONG],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-lop',
    label: 'danh sách lớp',
    element: <DanhSachLop />,
    roles: [
      ROLES.SINH_VIEN,
      ROLES.LOP_TRUONG,
      ROLES.GIAO_VIEN,
      ROLES.TRUONG_KHOA,
    ],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/ket-qua-phuc-vu-cong-dong',
    label: 'kết quả phục vụ cộng đồng',
    element: <KetQuaPhucVuCongDong />,
    roles: [ROLES.SINH_VIEN, ROLES.LOP_TRUONG],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/hoat-dong-cong-dong-cua-khoa',
    label: 'hoạt động cồng đồng của khoa',
    element: <HoatDongCongDongCuaKhoa />,
    roles: [ROLES.TRUONG_KHOA],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-khoa-ad',
    label: 'danh sách khoa',
    element: <AdminDanhSachKhoa />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-lop-ad',
    label: 'danh sách lớp',
    element: <AdminDanhSachLop />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-thong-bao-ad',
    label: 'danh sách thông báo',
    element: <AdminDanhSachThongBao />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-giao-vien-ad',
    label: 'danh sách giáo viên',
    element: <AdminDanhSachGiaoVien />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-sinh-vien-ad',
    label: 'danh sách sinh viên',
    element: <AdminDanhSachSinhVien />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/danh-sach-hoat-dong-cong-dong-ad',
    label: 'danh sách hoạt động cộng đồng',
    element: <AdminDanhSachHoatDongCongDong />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/hoat-dong-cong-dong-cua-truong-ad',
    label: 'hoạt động cộng đồng của trường',
    element: <AdminHoatDongCongDongCuaTruong />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    path: '/thoi-gian-xet-duyet-ad',
    label: 'Thời gian xét duyệt',
    element: <AdminThoiGianXetDuyet />,
    roles: [ROLES.ADMIN],
    onClick: function (navigator) {
      navigator(this.path)
    },
  },
  {
    label: 'đăng xuất',
    roles: [
      ROLES.SINH_VIEN,
      ROLES.LOP_TRUONG,
      ROLES.GIAO_VIEN,
      ROLES.TRUONG_KHOA,
      ROLES.ADMIN,
    ],
    onClick: function (navigator, dispatch) {
      // handle logout here
      dispatch(setRole([ROLES.ANONYMOUS]))
      localStorages.removeToken()
      navigator('/login')
    },
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]
