import { useEffect, useState } from "react";
import { userApiPrivate } from "../../axios/userApi";

function Profile() {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await userApiPrivate.get(`me`);
        console.log(res);
        setProfile(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  return <></>;
}

export default Profile;