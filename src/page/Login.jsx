import { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSupabaseAuth } from "../supabase";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login } = useSupabaseAuth(); // 🔥 Supabase 로그인 함수
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const { user, error } = await login({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    alert("로그인 성공!");
    navigate("/"); // 메인 페이지로 이동
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">로그인</h1>

        <FormInput
          label="이메일"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <FormInput
          type="password"
          label="비밀번호"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

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
