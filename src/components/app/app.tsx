import React, {useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {DndProvider} from "react-dnd";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFoundPage from "../../pages/not-found";
import {ProtectedRouteElement} from "../protected-route/protected-route";
import {UnprotectedRouteElement} from "../unprotected-route/unprotected-route";
import IngredientPage from "../../pages/ingredient";
import ProfileMenu from "../profile-menu/ProfileMenu";
import OrdersPage from "../../pages/orders";
import OrderPage from "../../pages/order";
import FeedOrdersPage from "../../pages/feed-orders";
import FeedOrderPage from "../../pages/feed-order";

function App() {

  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);
  const [modalFeedOrderActive, setModalFeedOrderActive] = useState(false);
  const [modalUserFeedOrderActive, setModalUserFeedOrderActive] = useState(false);
  return (
    <BrowserRouter>
      <AppHeader/>
      <Routes>
        <Route path="/" element={
          <div className={appStyles.appContent}>
            <DndProvider backend={HTML5Backend}>
              {
                <main className={appStyles.main}>
                  <BurgerIngredients isActive={modalIngredientActive}
                                     setModalActive={setModalIngredientActive}/>
                  <BurgerConstructor isActive={modalOrderActive} setModalActive={setModalOrderActive}/>
                </main>
              }
            </DndProvider>
          </div>}/>
        <Route path="/login" element={<UnprotectedRouteElement element={<LoginPage/>}/>}/>
        <Route path="/register" element={<UnprotectedRouteElement element={<RegisterPage/>}/>}/>
        <Route path="/forgot-password" element={<UnprotectedRouteElement element={<ForgotPassword/>}/>}/>
        <Route path="/reset-password" element={<UnprotectedRouteElement element={<ResetPasswordPage/>}/>}/>
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfileMenu/>}/>}>
          <Route index element={<ProtectedRouteElement element={<ProfilePage/>}/>}/>
          <Route path="orders" element={<ProtectedRouteElement element={<OrdersPage isActive={modalUserFeedOrderActive}
                                                    setModalActive={setModalUserFeedOrderActive}/>}/>}/>
          <Route path="orders/:id"
                 element={<OrderPage isActive={modalUserFeedOrderActive}
                                     setModalActive={setModalUserFeedOrderActive}/>}/>
        </Route>
        <Route path="/ingredients/:id"
               element={<IngredientPage isActive={modalIngredientActive} setModalActive={setModalIngredientActive}/>}/>
        <Route path="/feed" element={<FeedOrdersPage isActive={modalFeedOrderActive}
                                                     setModalActive={setModalFeedOrderActive}/>}
        />
        <Route path="/feed/:id" element={<FeedOrderPage isActive={modalFeedOrderActive}
                                                        setModalActive={setModalFeedOrderActive}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
