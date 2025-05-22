import Layout from "@/layout/Layout.js";
import styles from '@/styles/ControleSanitario.module.css'

export default function ControleSanitario() {
    return(
        <div class={styles.container}>
            <h1>Teste Controle Sanitário</h1>
        </div>
    )
}

ControleSanitario.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}