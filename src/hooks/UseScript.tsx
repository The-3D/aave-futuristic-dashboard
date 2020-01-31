import { useEffect } from 'react';

const useScript = (content: string, isUrl: boolean) => {
  useEffect(() => {
    const script = document.createElement('script');

    if(!isUrl){
        script.innerHTML = content;
    }
    else{
        script.src = content;
    }
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [content, isUrl]);
};

export default useScript;