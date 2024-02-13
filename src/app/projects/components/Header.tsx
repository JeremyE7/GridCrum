import '../layout.css'
import Hamburguer from './Hamburguer'
import BreadCrum from './BreadCrum'

export default function Header (): JSX.Element {
  return (
    <header>
      <Hamburguer />
      <BreadCrum />
    </header>
  )
}
