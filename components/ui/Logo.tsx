import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center w-full mb-5">
      <div className="relative w-40 h-40">
        <Image fill className="text-[#3b2f16]" alt="Logotipo Coffee POS" src="/logo-coffee.svg" />
      </div>
    </div>
  );
}
