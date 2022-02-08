import { useState, useEffect, useMemo } from "react";
const query_content_card = `
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
    `
const useTigerHall = () => {
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
        query: query_content_card,
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

  return {
    isLoading,
    setIsLoading,
    filteredCards,
    setSearchvalue
  };
};

export default useTigerHall;
