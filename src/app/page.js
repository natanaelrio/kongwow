import Banner from '@/component/banner'
import Footer from '@/component/footer'
import GoogleMap from '@/component/googleMap'
import ListProduct from '@/component/listProduct'
import Promo from '@/component/promo'

export const metadata = {
  title: 'Kong Wow | Camilan Singkong Istimewa',
  description: 'Camilan singkong premium, menawarkan rasa autentik, renyah, lezat, dan sehat.',
}

export default async function Home() {

  return (
    <>
      <Banner />
      <Promo />
      <ListProduct />
      <GoogleMap />
      <Footer />
    </>
  )
}
