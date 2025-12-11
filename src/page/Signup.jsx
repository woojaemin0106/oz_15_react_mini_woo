import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // 화면에 보여줄 에러 메시지
  const [errorMsg, setErrorMsg] = useState("");

  const { signUp } = useSupabaseAuth(); // Supabase 회원가입 함수
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 유효성 검사
  const validate = () => {
    if (!form.name.trim()) return "이름을 입력하세요.";
    if (!/^[가-힣a-zA-Z0-9]{2,8}$/.test(form.name))
      return "이름은 2~8자, 한글/영어/숫자만 사용할 수 있습니다.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      return "올바른 이메일 형식이 아닙니다.";
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(form.password))
      return "비밀번호는 영어+숫자 조합, 6자 이상이어야 합니다.";
    if (form.password !== form.confirm) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  // 🔥 회원가입 실행 함수
  const handleSignup = async () => {
    // 1) 클라이언트 유효성 검사
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    try {
      // 2) Supabase로 회원가입 요청
      const { user, error: signUpError } = await signUp({
        email: form.email,
        password: form.password,
        userName: form.name,
      });

      // 3) Supabase에서 에러 내려온 경우
      if (signUpError) {
        if (signUpError.message?.includes("User already registered")) {
          setErrorMsg("이미 가입된 이메일입니다. 로그인해주세요.");
        } else {
          setErrorMsg(signUpError.message || "회원가입에 실패했습니다.");
        }
        return;
      }

      // 4) 정상 완료
      alert("회원가입이 완료되었습니다. 이제 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      // signUp 내부에서 throw 한 경우 (422 등)
      console.error(err);

      if (err.message?.includes("User already registered")) {
        setErrorMsg("이미 가입된 이메일입니다. 로그인해주세요.");
      } else {
        setErrorMsg(
          "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">회원가입</h1>

        {/* 에러 메시지 영역 */}
        {errorMsg && <p className="text-sm text-red-400 mb-1">{errorMsg}</p>}

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
