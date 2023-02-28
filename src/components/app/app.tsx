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

function App() {
  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [modalIngredientActive, setModalIngredientActive] = useState(false);
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
        </div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients/:id" element={<h1> ingredients/:id </h1>} />
        <Route path="*" element={<h1> page 404 </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
