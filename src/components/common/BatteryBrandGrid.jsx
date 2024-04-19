import React from 'react';
import { Link } from 'react-router-dom';


const BatteryBrandsGrid = ({ brands }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const rows = [];
  for (let i = 0; i < brands.length; i += 6) {
    rows.push(brands.slice(i, i + 6));
  }

  return (
    <div className='car-brand-grid-wr'>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="brand-row flex  justify-center">
          {row.map((brand, index) => (
          <Link key={index} className="brand-item battery flex hover:bg-[#ff76370a] justify-center items-center" to={`/categories/show-batteries/${brand?.brandName}`}>
            <div className='max-w-[126px]'>
              <img  src={`${backend_url}/images/${brand?.brandLogo}`}  alt={brand.brandName} />
            </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BatteryBrandsGrid;
