import Link from "next/link";

const Logo = ({ closeDrawer }: { closeDrawer?: () => void }) => {
  return (
    <Link href="/" onClick={closeDrawer}>
      MovieDB
    </Link>
  );
};
export default Logo;
