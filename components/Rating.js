import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import { HStack } from "@chakra-ui/react";
const Rating = ({ rate = 0, count = 0, max = 5 }) => {
  const roundedRate = Math.round(rate);

  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <HStack>
        {[...new Array(roundedRate)].map((_, i) => (
          <AiFillStar key={i} />
        ))}
        {[...new Array(max - roundedRate)].map((_, i) => (
          <AiOutlineStar key={i} />
        ))}
        <span>({count})</span>
      </HStack>
    </IconContext.Provider>
  );
};

export default Rating;
