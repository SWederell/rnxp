import { useState } from "react";

export default function useModal() {
  const [shown, setShown] = useState(false);

  const toggle = (e) => {
    if (shown) {
      setShown(false);
    } else {
      setShown(true);
    }
  };

  return [shown, toggle];
}
