import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {

      setLoading(true);
      setError(null);
      
      const result = await fetchFunction();
      setData(result);
    } 
    catch (err) {
      setError(err instanceof Error ? err : new Error("an error occured"));
    } 
    finally {
      setLoading(false);
    }
  };
  const reset = ()=>{
    setData(null);
    setLoading(false);
    setError(null);
  }
 //as soon as the component loads we check auto fetch is true and we simply fetch the data

  useEffect(()=>{
    if(autoFetch){
        fetchData();
    }
  },[]);

  return{ data, Loading, error ,refetch: fetchData, reset }
};

export default useFetch;