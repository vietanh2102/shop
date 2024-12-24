import { useEffect, useState } from "react";
import { UserInfo } from "../types/Users.type";
import { userApiPrivate } from "../axios/userApi";

const useGetUser = () => {
  const [profile, setProfile] = useState<UserInfo>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await userApiPrivate.get(`me`);
        console.log(res);
        setProfile(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { profile, loading };
};
export default useGetUser;
