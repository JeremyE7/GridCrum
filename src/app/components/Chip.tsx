import styles from './components.module.css'

export default function Chip ({ children, styleChip }: { children: string, styleChip: React.CSSProperties }): JSX.Element {
  return (
    <small className={styles.chip} style={styleChip}>
      {children}
    </small>
  )
}
