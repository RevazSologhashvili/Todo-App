'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Tasks from './Components/Tasks/Tasks'


export default function Home() {
  
  return (
    <main className={styles.main}>
      <Tasks />
    </main>
  )
}
