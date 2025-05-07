import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout = useRef(null);
  const router = useRouter();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // 清除之前的定時器
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // 設置新的定時器，300ms 後執行導航
    debounceTimeout.current = setTimeout(() => {
      if (term.length >= 2) {
        router.push(`/home_label/search?q=${encodeURIComponent(term)}`);
      } else {
        router.push(`/home_label/search`);
      }
    }, 300);
  };

  // 清理定時器，防止內存洩漏
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className=" flex gap-4 justify-center items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full p-2 border rounded-lg "
      />
    </div>
  );
}

export default Search