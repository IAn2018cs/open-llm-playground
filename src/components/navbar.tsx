import PgModeSelect from "@/components/pg-mode-select";
import MobileSettings from "@/components/mobile-setting";
import { cn } from "@/lib/utils";
import { IconGitHub } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-5 pt-3 md:border-b md:px-6 md:py-3">
      <div className="flex items-center gap-x-4">
        <h1 className="text-2xl font-semibold">Amber Open LLM 游乐场</h1>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <MobileSettings />
      </div>
    </div>
  );
};

export default Navbar;
