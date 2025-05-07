import Link from "next/link";

const Header = ({content}: {content?: string}) => { 
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        {content}
      </Link>
      .
    </h2>
  );
};

export default Header;
