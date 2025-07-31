import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp.tsx"
import SignIn from "./pages/SignIn.tsx"
import { RecoilRoot } from "recoil"
import Home from "./pages/Home.tsx"
import Protected from "./components/Protected/Protected.tsx"
import UpdateList from "./pages/UpdateList.tsx"

import TaskShow from "./pages/TaskShow.tsx"

function App() {
  return (
    <div>
      <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard"  element={<Protected><Home/></Protected>}/>
        <Route path="/updateList/:id"  element={<Protected><UpdateList/></Protected>}/>
        <Route path="/showTask/:listId/:taskId"  element={<Protected><TaskShow/></Protected>}/>

         <Route path="/" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </div>
  )
}

export default App
