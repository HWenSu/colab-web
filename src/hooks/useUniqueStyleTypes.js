import { useMemo } from "react";
import useApiFetch from "@/hooks/useApiFetch";


const useUniqueStyleTypes = () => {
  const api_url_path_g = "/data/Product_Garment.json";
  // 使用 useApiFetch 載入 Garment 資料
  const {
    data: garmentDetails,
    loading: garmentLoading,
    error: garmentError,
  } = useApiFetch(api_url_path_g);

  // 篩選不重複的tStyleTypeName
  return useMemo(() => {
    if (!garmentDetails) return [];

    return  Object.values(
      garmentDetails.reduce((acc, item) => {
        // 從 item 中取出 tSex 和 tStyleTypeName
        const { tSex, tStyleTypeName } = item;

        // 如果某一筆資料缺少 tSex 或 tStyleTypeName，就跳過不要處理
        if (!tSex || !tStyleTypeName) return acc;

        // 建立第一個物件
        if (!acc[tSex]) {
          acc[tSex] = {
            tSex,
            tStyleTypeName: new Set(),
          };
        }
        acc[tSex].tStyleTypeName.add(tStyleTypeName.toUpperCase());
        return acc;
      }, {})
    ).map(({ tSex, tStyleTypeName }) => ({
      tSex,
      tStyleTypeName: Array.from(tStyleTypeName),
    }));
  }, [garmentDetails]);

}

export default useUniqueStyleTypes


