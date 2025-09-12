import Navbar from '../../components/navbar'
import HeroSlider from '../../components/slider'
import ProductPreview from '../../components/productpreview'
import Featured from '../../components/featured'
import Banner from '../../components/banner'
import Email from '../../components/email'
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'


export default function Home (){
  return (
    <div>
      <Navbar />
      <div className='px-8 sm:px-32 flex flex-col gap-18 max-[480px]:px-8 '>
      <HeroSlider />
      <ProductPreview />
      <Featured />
      <Banner />
      <Email />
      <Footer />
      </div>
      <Copyright />
    </div>
  )
}