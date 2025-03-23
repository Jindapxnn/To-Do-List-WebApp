import "./globals.css";
import Home from "./page"

export default function RootLayout({children} : {children : React.ReactNode}){
  return(
    <html>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
