import { Skeleton,Box,VStack, SkeletonText } from '@chakra-ui/react'

import React from "react";
import {WHITE} from '../../helpers/colors';

const ContentCardSkeleton = (props) => {
  return (
    <>
      <Box width="276px">
        <VStack
          spacing="0px"
          borderRadius="5px"
          overflow="hidden"
          backgroundColor={WHITE}
        >
          <Skeleton width='100%' height="130px" />  
          <VStack
            alignItems="flex-start"
            w="100%"
            spacing="3px"
            p="10px 12px"
            pb="32px"
          > 
          <SkeletonText w="100%"  mt='4' noOfLines={5} spacing='4' />
        </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default ContentCardSkeleton;
