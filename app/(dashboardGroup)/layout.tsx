import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const TenantLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div>
      <div className="sticky top-0 z-10 ">
        <Navbar user={user} />
      </div>
      <div className="max-w-7xl mx-auto ">{children}</div>
    </div>
  );
};

export default TenantLayout;
