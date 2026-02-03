import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return { handleNavigate };
}