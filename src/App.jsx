import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { EventProvider } from "./context/EventContext"
import { GlobalProvider } from "./context/GlobalContext"
import { UserProvider } from "./context/UserContext"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <GlobalProvider>
          <EventProvider>
            <AppRoutes />
            <Toaster />
          </EventProvider>
        </GlobalProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
