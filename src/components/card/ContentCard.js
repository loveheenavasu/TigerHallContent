import { VStack, Image, Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  WHITE,
  TIGERHALL_ORANGE,
  BLACK,
  LIGHT_BLACK,
} from "../../helpers/colors";

const ContentCard = (props) => {
  const { cardData } = props;
  const imageUrl = cardData.image.uri.substring(0, 32) + '/resize/276x' + cardData.image.uri.substring(32, cardData.image.uri.length)

  return (
    <>
      <Box width="276px">
        <VStack
          spacing="0px"
          borderRadius="5px"
          overflow="hidden"
          backgroundColor={WHITE}
        >
          <Image
            src={imageUrl}
            alt={'No image'}
            w="100%"
            h="130px"   
            objectFit="cover"
          />
          <VStack
            alignItems="flex-start"
            w="100%"
            spacing="3px"
            p="10px 12px"
            pb="32px"
          >
            <Text color={TIGERHALL_ORANGE} fontSize="12px" fontWeight="700">
              {cardData.categories[0].name}
            </Text>
            <Text color={BLACK} fontSize="18px" fontWeight="700">
              {cardData.name || ""}
            </Text>
            {Array.isArray(cardData.experts) &&
              cardData.experts.length > 0 &&
              cardData.experts.map((expert, index) => {
                return (
                  <VStack spacing="4px" key={index} pt="8px" alignItems="flex-start" >
                    <Text color={LIGHT_BLACK} fontSize="14px" fontWeight="600">
                      {`${expert.firstName} ${expert.lastName}`}
                    </Text>
                    <Text color={LIGHT_BLACK} fontSize="14px" fontWeight="600">
                      {expert.title}
                    </Text>
                    <Text
                      color={TIGERHALL_ORANGE}
                      fontSize="14px"
                      fontWeight="600"
                    >
                      {expert.company}
                    </Text>
                  </VStack>
                );
              })}
          </VStack>
        </VStack>
      </Box>
    </>
  );
};

export default ContentCard;
