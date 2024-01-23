import styles from '../page.module.css'

export default function BreadCrum (): JSX.Element {
  return (
    <nav aria-label='Breadcrumb' className={styles.breadcrumb}>
      <ul>
        <li><span aria-current='page'>Proyectos</span></li>
      </ul>
    </nav>
  )
}
