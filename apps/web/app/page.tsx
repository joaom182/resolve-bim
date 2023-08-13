import Image from "next/image";
import logo from "../assets/resolve-logo.png";
import EntityInspector from "../components/entity-inspector";

export default function Page() {
  return (
    <div className="w-full max-w-md mx-auto pt-20">
      <Image
        src={logo}
        width={180}
        alt={"ResolveBIM logo"}
        className="mx-auto"
      />
      <div className="my-16">
        <EntityInspector />
      </div>
    </div>
  );
}
