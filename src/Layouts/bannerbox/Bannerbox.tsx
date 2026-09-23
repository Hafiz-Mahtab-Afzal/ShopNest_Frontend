import { Link } from 'react-router-dom';

interface BannerboxProps {
  img: string;
}

const Bannerbox: React.FC<BannerboxProps> = ({ img }) => {
  return (
    <div className="box bannerbox overflow-hidden rounded-lg">
      <Link to="/">
        <img src={img} className="w-full h-28 lg:h-44 object-cover lg:object-fill" alt="banner" />
      </Link>
    </div>
  );
};

export default Bannerbox;
