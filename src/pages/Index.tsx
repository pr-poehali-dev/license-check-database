import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1F2C] text-white font-mono">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Icon
            name="AlertTriangle"
            size={64}
            className="mx-auto mb-4 text-[#8E9196]"
          />
          <h1 className="text-8xl font-bold mb-2 text-[#8E9196]">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        </div>

        <div className="text-[#8E9196] text-sm mb-8 space-y-1">
          <p>The requested resource could not be found.</p>
          <p className="font-mono text-xs opacity-60">Error: ENOTFOUND</p>
        </div>

        <Button
          variant="outline"
          className="border-[#8E9196] text-[#8E9196] hover:bg-[#8E9196] hover:text-[#1A1F2C]"
          onClick={() => window.location.reload()}
        >
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default Index;
