import styles from './components.module.css'

export default function Chip ({ children }: { children: string }): JSX.Element {
  return (
    <small className={styles.chip}>
      {children}
    </small>
  )
}
