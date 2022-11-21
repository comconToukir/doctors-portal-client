import { useState, useEffect } from "react";

const useCheckAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    fetch(`https://doctors-portal-server-flax-eta.vercel.app/users/admin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.isAdmin);
        setIsAdminLoading(false);
      });
  }, [email]);

  return [isAdmin, isAdminLoading];
};

export default useCheckAdmin;
