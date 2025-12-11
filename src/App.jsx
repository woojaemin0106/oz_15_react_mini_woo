import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./page/Home.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import Signup from "./page/Signup.jsx";
import Login from "./page/Login.jsx";
import { useSupabaseAuth } from "./supabase";

function App() {
  const { getUserInfo } = useSupabaseAuth();

  // 앱이 처음 마운트될때 현재 로그인한 유저 정보 동기화
  useEffect(() => {
    const syncUser = async () => {
      try {
        await getUserInfo(); // localStorage , 전역 상태 업데이트
      } catch (err) {
        console.error("유저 정보 동기화 실패:", err);
      }
    };

    syncUser();
  }, [getUserInfo]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
