import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

interface CategoryPanelProps {
  isopencatpanel: boolean;
  setisopencatpanel: (value: boolean) => void;
}

const CategoryPanel: React.FC<CategoryPanelProps> = (props) => {

  const [submenuindex, setsubmenuindex] = useState<number | null>(null);
  const [innersubmenuindex, setinnersubmenuindex] = useState<string | null>(null);

  const toggleDrawer = (newopen: boolean) => {
    props.setisopencatpanel(newopen);
  }

  const opensubmenu = (index: number) => {
    if (submenuindex === index) {
      setsubmenuindex(null);
    }
    else {
      setsubmenuindex(index);
      setinnersubmenuindex(null);
    }
  };

  const openinnersubmenu = (key: string) => {
    if (innersubmenuindex === key) {
      setinnersubmenuindex(null);
    }
    else {
      setinnersubmenuindex(key);
    }
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation"
      className="categoryPanel"
    >

      <h3 className='p-3 text-[16px] flex items-center justify-between font-[500]'>Shop By Categories <IoCloseSharp
        className='cursor-pointer text-[18px] font-[500]' onClick={() => toggleDrawer(false)} /> </h3>
      <hr />

      <div className='scroll'>
        <ul className='max-w-full'>

          <li className='list-none flex flex-col relative'>
            <div className='flex items-center w-full'>
              <Link to="/" className='w-full'>
                <Button className='!w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Fashion</Button>
              </Link>

              {
                submenuindex === 0 ?
                  <IoIosArrowDown
                    onClick={() => opensubmenu(0)}
                    className='absolute top-[10px] right-[15px] cursor-pointer' />
                  :
                  <IoIosArrowForward
                    onClick={() => opensubmenu(0)}
                    className='absolute top-[10px] right-[15px] cursor-pointer' />
              }
            </div>

            {
              submenuindex === 0 && <ul className='submenu w-full pl-3'>
                <li className='list-none flex flex-col relative'>
                  <div className='flex items-center w-full'>
                    <Link to="/" className='w-full'>
                      <Button
                        className='!w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Apparel</Button>
                    </Link>
                    {
                      innersubmenuindex === '0-0' ?
                        <IoIosArrowDown
                          onClick={() => openinnersubmenu('0-0')}
                          className='absolute top-[10px] right-[15px] cursor-pointer' />
                        :
                        <IoIosArrowForward
                          onClick={() => openinnersubmenu('0-0')}
                          className='absolute top-[10px] right-[15px] cursor-pointer' />
                    }
                  </div>

                  {
                    innersubmenuindex === '0-0' && <ul className='inner_submenu w-full pl-3'>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Smart Tablet</Link>
                        </Button>
                      </li>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Crepe T-Shirt</Link>
                        </Button>
                      </li>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Leather Watch</Link>
                        </Button>
                      </li>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Rolling Diamond</Link>
                        </Button>
                      </li>
                    </ul>
                  }

                </li>
              </ul>
            }

          </li>

          <li className='list-none flex flex-col relative'>
            <div className='flex items-center w-full'>
              <Link to="/" className='w-full'>
                <Button className='!w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>OutWear</Button>
              </Link>
              {
                submenuindex === 1 ?
                  <IoIosArrowDown
                    onClick={() => opensubmenu(1)}
                    className='absolute top-[10px] right-[15px] cursor-pointer' />
                  :
                  <IoIosArrowForward
                    onClick={() => opensubmenu(1)}
                    className='absolute top-[10px] right-[15px] cursor-pointer' />
              }
            </div>

            {
              submenuindex === 1 && <ul className='submenu w-full pl-3'>
                <li className='list-none flex flex-col relative'>
                  <div className='flex items-center w-full'>
                    <Link to="/" className='w-full'>
                      <Button
                        className='!w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Apparel</Button>
                    </Link>
                    {
                      innersubmenuindex === '1-0' ?
                        <IoIosArrowDown
                          onClick={() => openinnersubmenu('1-0')}
                          className='absolute top-[10px] right-[15px] cursor-pointer' />
                        :
                        <IoIosArrowForward
                          onClick={() => openinnersubmenu('1-0')}
                          className='absolute top-[10px] right-[15px] cursor-pointer' />
                    }
                  </div>

                  {
                    innersubmenuindex === '1-0' && <ul className='inner_submenu w-full pl-3'>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Smart Tablet</Link>
                        </Button>
                      </li>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Crepe T-Shirt</Link>
                        </Button>
                      </li>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Leather Watch</Link>
                        </Button>
                      </li>

                      <li className='list-none relative'>
                        <Button className='!w-full link transition !text-left !justify-start !px-3 !text-[14px] !text-[rgba(0,0,0,0.8)]'>
                          <Link to="/">Rolling Diamond</Link>
                        </Button>
                      </li>
                    </ul>
                  }

                </li>
              </ul>
            }

          </li>

        </ul>
      </div>

    </Box>
  );

  return (
    <>
      <Drawer open={props.isopencatpanel} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  )
}

export default CategoryPanel