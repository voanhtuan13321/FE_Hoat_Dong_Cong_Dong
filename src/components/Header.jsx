import Logo from '../assets/images/Logo.png'

export default function Header() {
  return (
    <div className='container mx-40 py-3 flex flex-row items-center gap-4'>
      <img src={Logo} alt='Logo' />
      <p className='text-primary font-bold font-big uppercase'>
        HỆ THỐNG THÔNG TIN SINH VIÊN
      </p>
    </div>
  )
}
