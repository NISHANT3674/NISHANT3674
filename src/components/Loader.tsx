import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-24 h-24 border-t-transparent rounded-full animate-spin">
        <Image
          src="/favicon.png" // Replace with your loader image path
          alt="Loading..."
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
