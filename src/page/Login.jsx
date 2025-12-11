import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useSupabaseAuth } from "../supabase";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // supabase auth 훅에서 필요한 함수 꺼내씀
  const { login, getUserInfo } = useSupabaseAuth();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 로그인 실행 함수
  const handleLogin = async () => {
    setErrorMsg("");

    //  기본 입력값 체크
    if (!form.email || !form.password) {
      setErrorMsg("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      //  Supabase 로그인 요청
      const { user, error } = await login({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setErrorMsg(error.message || "로그인에 실패했습니다.");
        return;
      }

      //  로그인 성공 - > 유저 정보 동기화
      await getUserInfo();

      //  메인 페이지로 이동
      navigate("/");
    } catch (err) {
      console.error("로그인 중 오류:", err);
      setErrorMsg("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">로그인</h1>

        <FormInput
          label="이메일"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="example@email.com"
        />

        <FormInput
          type="password"
          label="비밀번호"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />

        {/* 에러 메시지 */}
        {errorMsg && <p className="text-sm text-red-400 mt-1">{errorMsg}</p>}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full bg-violet-600 hover:bg-violet-700 transition rounded py-2 font-semibold mt-2"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
