import { VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import ContentCard from "../card/ContentCard";
import SearchBar from "../search/SearchBar";
import { DARK_TEAL, WHITE } from "../../helpers/colors";
import ContentCardSkeleton from "../../components/card/ContentCardSkeleton";

const TigerHall = (props) => {
  const [searchValue, setSearchvalue] = useState("");
  const [contentData, setContentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.staging.tigerhall.io/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        contentCards(filter: {limit: 20, keywords: "", types: [PODCAST]}) {
          edges {
            ... on Podcast {
              name
              image {
                ...Image
              }
              categories {
                ...Category
              }
              experts {
                ...Expert
              }
            }
          }
        }
      }
      fragment Image on Image {
        uri
      }
      fragment Category on Category {
        name
      }
      fragment Expert on Expert {
        firstName
        lastName
        title
        company
      }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setContentData(result.data.contentCards.edges || []);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  const filteredCards = useMemo(
    () =>
      contentData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, contentData]
  );


  return (
    <>
      <main>
        <VStack
          backgroundColor={DARK_TEAL}
          minH="100vh"
          padding="15px 60px"
          w="100%"
        >
          <VStack alignItems="flex-start" spacing="4px" mb="14px" w="276px">
            <Text color={WHITE} fontSize="14px" fontWeight="700" margin="0px">
              Search
            </Text>
            <SearchBar
              setIsLoading={setIsLoading}
              onChange={(value) => {
                setSearchvalue(value);
                setIsLoading(false);
              }}
            />
          </VStack>
          <VStack spacing="10px">
            {!isLoading &&
              (filteredCards || []).map((data, index) => {
                return <ContentCard key={index} cardData={data} />;
              })}
            {isLoading &&
              Array(10)
                .fill("dummy")
                .map(() => <ContentCardSkeleton />)}
          </VStack>
        </VStack>
      </main>
    </>
  );
};

export default TigerHall;
