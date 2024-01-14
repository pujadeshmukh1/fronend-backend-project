
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="flex h-screen">
      <nav className="flex bg-[#F4F4F4] w-[200px]">
        <div className="space-y-4">
          <Link to="/" className="py-2 px-4 block">Home</Link>
          <Link to="/category" className="py-2 px-4 block">Category</Link>
          <Link to="/products" className="py-2 px-4 block">Products</Link>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
