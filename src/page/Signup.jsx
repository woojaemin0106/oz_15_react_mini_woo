import { useState } from "react";
import FormInput from "../components/FormInput";
import { useSupabaseAuth } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import React from "react";
function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const { signUp } = useSupabaseAuth(); //  Supabase 회원가입 함수
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  //  유효성 검사
  const validate = () => {
    if (!form.name.trim()) return "이름을 입력하세요.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      return "올바른 이메일 형식이 아닙니다.";
    if (form.password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    if (form.password !== form.confirm) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  // 🔥 회원가입 실행 함수
  const handleSignup = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    // Supabase로 회원가입 요청
    const { user, error } = await signUp({
      email: form.email,
      password: form.password,
      userName: form.name,
    });

    if (error) {
      setError(error.message);
      return;
    }

    alert("회원가입 성공!");
    navigate("/login"); // 로그인 페이지로 이동
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">회원가입</h1>

        <FormInput
          label="이름"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="홍길동"
        />

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
        />

        <FormInput
          type="password"
          label="비밀번호 확인"
          value={form.confirm}
          onChange={(e) => handleChange("confirm", e.target.value)}
        />

        {/* 버튼 */}
        <button
          onClick={handleSignup}
          className="w-full bg-violet-600 hover:bg-violet-700 transition rounded py-2 font-semibold mt-2"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
