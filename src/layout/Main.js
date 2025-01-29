import Header from "../components/Header";
import { Outlet } from 'react-router-dom';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Main;
