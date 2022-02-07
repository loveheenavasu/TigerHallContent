import React from "react";
import { Box, Input } from "@chakra-ui/react";
import { GREY, TIGERHALL_TEAL } from "../../helpers/colors";
import {debounce} from 'lodash';

const SearchBar = (props) => {
  const {onChange,setIsLoading} = props;
  const debounceSearchValue = debounce(value => onChange(value),300);

  return (
    <>
      <Box width="100%">
        <Input
          placeholder="Type any keyword"
          backgroundColor={TIGERHALL_TEAL}
          w="100%"
          p="0px 8px"
          h="29px"
          onChange={e => {
            setIsLoading(true)
            debounceSearchValue(e.target.value);
          }}
          fontSize="14px"
          color={GREY}
          border="0px solid"
          borderRadius="5px"
        />
      </Box>
    </>
  );
};

export default SearchBar;
