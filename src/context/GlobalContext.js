// 定義全域 Context 和 Provider
"use client"
import { createContext, useContext, useReducer, useEffect } from "react"
import reducer from "./reducer"

// 建立一個 Context 物件（容器），用來「儲存全域資料」
const GlobalStateContext = createContext()

// 自訂 Hook useGlobalState() 方便子組件讀取與更新狀態
export function useGlobalState() {
  return useContext(GlobalStateContext)
}

export default function GlobalContextProvider ({children}) {
  //設定會員和購物車初始狀態
  const initialState = { user: null, cart: [] };

  const [state, dispatch] = useReducer(reducer, initialState);

  //載入 localStorage 中的購物車狀態
  useEffect(() => {
    const stored = localStorage.getItem("cartSate");
    if (stored) {
      dispatch({ type: "init", payload: JSON.parse(stored) });
    }
  }, []);

  // 每次購物車狀態更新時，同步存回 localStorage
  useEffect(()=> { localStorage.setItem("cartState", JSON.stringify(state)) }, [state])

  return (
    // 把提供的資料放進 value 裡
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}