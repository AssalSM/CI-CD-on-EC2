
import styles from "./page.module.css";
import Link from "next/link";
import  Line from "@/component/Line.jsx"
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={"/Notes"} >
          go to notes
         
        </Link>
    
      </div>
      <Line />
      <div className={styles.description}>
        <Link href={"/signup"} >
         sign up
         
        </Link>
    
      </div>
      <Line />
      <div className={styles.description}>
        <Link href={"/signIn"} >
         sign in
         
        </Link>
    
      </div>
      <Line />
     

      
    </main>
  );
}
