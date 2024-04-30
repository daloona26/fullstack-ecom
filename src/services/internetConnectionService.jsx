import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CiWifiOff } from "react-icons/ci";
import { useDispatch } from "react-redux";
const InternetConnectionService = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toastIdRef = useRef();
  const [isOline, setIsOnline] = useState(true);

  function close() {
    toast.closeAll(toastIdRef.current);
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You'r offline.",
      description: "Please make sure you have internet connection.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <CiWifiOff className="text-4xl" />,
    });
  }

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);

  window.addEventListener("offline", (e) => {
    setIsOnline(false);
  });

  window.addEventListener("online", (e) => {
    setIsOnline(true);
    close();
  });

  if (!isOline) {
    return (
      <>
        {children} {addToast()}
      </>
    );
  }

  return children;
};

export default InternetConnectionService;
