import Layout from "@/layout/Layout.js";
import styles from '@/styles/Manejo.module.css'

export default function Manejo() {
    return(
        <div class={styles.container}>
            <h1>Teste Manejo</h1>
        </div>
    )
}

Manejo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}