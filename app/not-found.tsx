// app/[locale]/not-found.tsx
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react"; // Assuming you're using lucide-react for icons

export default function NotFound() {
  const t = useTranslations("404");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        {/* 404 Image or Icon */}
        <div className="relative w-full max-w-[400px] h-[300px] mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg opacity-10" />
          <div className="text-[150px] font-bold text-gray-900 absolute inset-0 flex items-center justify-center">
            404
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-2">
          {t("title")}
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
          {t("description")}
        </p>

        {/* Home Button */}
        <Link href="/" className="inline-block">
          <Button className="inline-flex items-center justify-center rounded-md bg-primary text-white px-8 py-3 text-sm font-medium transition-colors hover:bg-primary/90">
            <Home className="mr-2 h-4 w-4" />
            {t("backHome")}
          </Button>
        </Link>
      </div>

      {/* Optional: Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
    </div>
  );
}
