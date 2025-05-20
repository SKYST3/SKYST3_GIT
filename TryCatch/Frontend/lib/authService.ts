// lib/authService.ts

export interface SignUpPayload {
  username:     string;
  login_id:     string;
  password:     string;
  birth_year:   number;
  birth_month:  number;
  birth_date:   number;
  birth_hour:   number;
  birth_minute: number;
}

export interface SignInPayload {
  login_id: string;
  password: string;
}

export interface SignUpResponse {
  accessToken: string;
}

export interface SignInResponse {
  accessToken:  string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken:  string;
  refreshToken?: string;
}

/**
 * 회원가입 후 바로 accessToken 을 반환합니다.
 */
export async function signUp(
  payload: SignUpPayload
): Promise<SignUpResponse> {
  const res = await fetch(
    "https://api.memory123.store/api/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error(`SignUp failed: ${res.status}`);
  }
  const json = await res.json();
  return {
    accessToken: json.access_token,
  };
}

/**
 * 로그인 시 accessToken과 refreshToken을 모두 camelCase 로 반환합니다.
 */
export async function signIn(
  payload: SignInPayload
): Promise<SignInResponse> {
  const res = await fetch(
    "https://api.memory123.store/api/users/signin",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error(`SignIn failed: ${res.status}`);
  }
  const json = await res.json();
  return {
    accessToken:  json.access_token,
    refreshToken: json.refresh_token,
  };
}

/**
 * refreshToken 으로 새로운 토큰을 받아옵니다.
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshResponse> {
  const res = await fetch(
    "https://api.memory123.store/api/users/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error(`Refresh failed: ${res.status}`);
  }
  const json = await res.json();
  return {
    accessToken:  json.access_token,
    refreshToken: json.refresh_token ?? undefined,
  };
}

/**
 * 로그아웃 시 로컬스토리지에서 모두 제거합니다.
 */
export function signOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
