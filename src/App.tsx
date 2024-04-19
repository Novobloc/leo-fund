import { useEffect, useState } from "react";
import Loader from "./layout/Loader";
import Routing from "./Routing";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return <>{loading ? <Loader /> : <Routing />}</>;
}

export default App;
