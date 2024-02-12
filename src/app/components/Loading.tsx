import styles from './components.module.css'

export default function Loading (): JSX.Element {
  return (
    <section className={styles.loader}>
      <div className={styles.ldsGrid}><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
    </section>
  )
}
