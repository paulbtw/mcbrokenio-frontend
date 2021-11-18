import React from 'react';
import { Flex, Text, Badge, Box } from '@chakra-ui/react';

interface BadgeProps {
  name: string;
  hasItem: boolean | null;
}

export const Status: React.FC<BadgeProps> = ({ name, hasItem }) => {
  const hasItemRender = (active: Boolean | null) => {
    if (active === true) {
      return <Badge colorScheme="green">Available</Badge>;
    }
    if (active === false) {
      return <Badge colorScheme="red">Unavailable</Badge>;
    }
    return <Badge colorScheme="gray">Unknown</Badge>;
  };

  return (
    <Flex>
      <Box flexGrow={1}>
        <Text>{name}</Text>
      </Box>
      {hasItemRender(hasItem)}
    </Flex>
  );
};
