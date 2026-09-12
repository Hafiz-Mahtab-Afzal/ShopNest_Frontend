

import { Outlet } from "react-router-dom";
import Header from "./Layouts/Header/Header";
import Navigation from "./Layouts/Navigation";
import ChatWidget from "./ChatWidget";

const MainLayout = () => (
  <>
    <Header />
    <Navigation />
    <Outlet />
    <ChatWidget />

  </>
);

export default MainLayout;