
import { getMe } from "@/service/getMe";
import ProfileCard from "./_components/ProfileCard";

export default async function ProfilePage() {
  const user = await getMe();
// console.log(user.data, "user profile page");
  return (
    <div className="container mx-auto py-10">
      <ProfileCard profile={user.data.profile} />
    </div>
  );
}