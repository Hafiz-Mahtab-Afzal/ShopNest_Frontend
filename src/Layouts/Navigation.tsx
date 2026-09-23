import { RiMenu2Fill } from 'react-icons/ri';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { GoRocket } from 'react-icons/go';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CategoryPanel from './Header/CategoryPanel';
import { useState } from 'react';

interface CategoryItem {
  label: string;
  slug: string;
}

const Navigation = () => {
  const [isopencatpanel, setisopencatpanel] = useState<boolean>(false);

  const menItems: CategoryItem[] = [
    { label: 'T-Shirts', slug: 't-shirts' },
    { label: 'Jeans', slug: 'jeans' },
    { label: 'Footwear', slug: 'shoes' },
    { label: 'Watches', slug: 'watches' },
    { label: 'Pants', slug: 'pants' },
  ];

  const fashionItems: CategoryItem[] = [
    { label: 'Women', slug: 'dresses' },
    { label: 'Kids', slug: 'kids' },
    { label: 'Girls', slug: 'girls' },
    { label: 'Boys', slug: 'boys' },
  ];

  const mainCategoryItems: CategoryItem[] = [
    { label: 'Electronics', slug: 'electronics' },
    { label: 'Bags', slug: 'handbags' },
    { label: 'Footwear', slug: 'shoes' },
    { label: 'Groceries', slug: 'groceries' },
    { label: 'Beauty', slug: 'beauty' },
    { label: 'Wellness', slug: 'wellness' },
    { label: 'Jewellery', slug: 'rings' },
  ];

  return (
    <>
      <nav className="pb-3 bg-white">
        <div className="container flex flex-wrap lg:flex-nowrap items-center justify-between">

          {/* ── Shop By Categories Button ── */}
          <div className="col1 w-auto lg:w-[20%]">
            <Button onClick={() => setisopencatpanel(true)} className="!text-black gap-2 w-full">
              <RiMenu2Fill className="text-[10px] text-base" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px] !text-black ml-[34px] font-bold" />
            </Button>
          </div>

          {/* ── Nav Links ── */}
          <div className="col2 order-last lg:order-none mx-auto w-full lg:w-[60%] pl-0 lg:pl-7 overflow-x-auto lg:overflow-visible">
            <ul className="flex items-center justify-start lg:justify-center gap-2 lg:gap-5 nav">

              {/* Fashion — dropdown wala */}
              <li className="list-none relative">
                <Button className="link transition !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !font-[500]">
                  Fashion
                </Button>

                <div className="submenu absolute top-[120%] left-0 min-w-[150px] !bg-white shadow-md opacity-0 transition-all z-50">
                  <ul>
                    {/* Men → sub-dropdown */}
                    <li className="list-none relative">
                      <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] w-full !justify-start">
                        Men
                      </Button>
                      <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] !bg-white shadow-md opacity-0 transition-all z-50">
                        <ul>
                          {menItems.map(item => (
                            <li key={item.slug} className="list-none">
                              <Button component={Link} to={`/category/${item.slug}`}
                                className="!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] w-full !justify-start">
                                {item.label}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>

                    {fashionItems.map(item => (
                      <li key={item.slug} className="list-none">
                        <Button component={Link} to={`/category/${item.slug}`}
                          className="!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] w-full !justify-start">
                          {item.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Baaki simple links */}
              {mainCategoryItems.map(item => (
                <li key={item.slug} className="list-none">
                  <Button component={Link} to={`/category/${item.slug}`}
                    className="link transition !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !font-[500]">
                    {item.label}
                  </Button>
                </li>
              ))}

            </ul>
          </div>

          {/* ── Free Delivery ── */}
          <div className="col3 w-auto lg:w-[20%] pl-0 lg:pl-16 hover:text-red-600">
            <p className="text-[14px] font-[500] flex items-center gap-3">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>

        </div>
      </nav>

      <CategoryPanel setisopencatpanel={setisopencatpanel} isopencatpanel={isopencatpanel} />
    </>
  );
};

export default Navigation;