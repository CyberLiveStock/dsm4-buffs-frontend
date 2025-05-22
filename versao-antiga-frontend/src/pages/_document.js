import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        {/* Link para fontes do Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <body>
        <Main />  {/* Onde o conteúdo da aplicação será renderizado */}
        <NextScript />  {/* Scripts do Next.js */}
      </body>
    </Html>
  );
}
