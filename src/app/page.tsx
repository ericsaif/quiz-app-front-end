// import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        
        <h1>
          Добро пожаловать
        </h1>
          

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/user/auth/login"
            rel="noopener noreferrer"
          >
            Войти
          </a>
          <a
            href="user/auth/register"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Зарегистрироваться
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
