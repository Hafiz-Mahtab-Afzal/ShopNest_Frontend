







import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from "react-icons/md";

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {


    /*
       rating: 2 
        fullstars 2 

hasHalfStar: false 
 
    */
 
    const stars = [];
    const fullStars = Math.floor(rating);  //// 1     4.8    ==       4 ceil =    5  5 

    const hasHalfStar = rating % 1 >= 0.5; /// true 




//  alert(2%1)


    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MdOutlineStar
          key={i}
          className="w-5 h-5 text-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MdOutlineStarHalf
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
        />,
      );
    }

        const emptyStars = 5 - stars.length;


    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MdOutlineStarBorder className="w-5 h-5 text-gray-400" />);
    }


  return  (
          <div className="flex text-2xl gap-1 w-">
                      {stars}
          </div>
  )
}

export default Rating