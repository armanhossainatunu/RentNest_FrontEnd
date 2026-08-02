import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const LandlordLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe()
  return (
    <div>
   
      <div className="max-w-7xl mx-auto ">{children}</div>
    </div>
  );
};

export default LandlordLayout;
