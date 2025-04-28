// constants/api.ts
// export const BACKEND_BASE_URL = process.env.BACKEND_API_URL;
export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";

export const QUIZ_HUB_ROUTE = process.env.NEXT_PUBLIC_SIGNALR_HUB_URL || "/QuizHub"
