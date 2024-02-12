import styles from './page.module.css'

export default function Home (): JSX.Element {
  return (
    <main className={styles.main}>
      <header>
        <nav>
          <button>
            Register
          </button>
          <button>
            Login
          </button>
        </nav>
      </header>
      <ul className={styles.circles}>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <section className={styles.presentation}>
        <h1>GridCrum</h1>
        <h3>
          An easy and powerfull tool to manage your <strong className={styles.strong}>SCRUM</strong> projects
        </h3>
      </section>
      <section className={styles.questions}>
        <span>
          <h2>What is GridCrum?</h2>
          <p>
            It's a simple and intuitive tool to manage your scrum projects based on a grid visual sistem, which allows you to take control of your project dates, springs, tasks and different types of elements.
          </p>
        </span>
        <span>
          <h2>How does it work?</h2>
          <p>
            It's simple, first you need to register and create a new project, add the tasks, springs and dates and then you can start to manage your project.
          </p>
        </span>
      </section>
    </main>
  )
}
