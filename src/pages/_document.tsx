import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MDocument extends Document{

    render ()
    {
        return(
            <Html>
                <head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
                </head>
                <body>
                    <main></main>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}